import React from 'react'

import { createMemoryHistory } from 'history'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { screen, cleanup } from '@testing-library/react'

import firstTenPatients from '__tests__/mocks/json/firstTenPatients'

import HomePage from '@pages/HomePage'

import { renderWithRouterAndStore } from '../../helpers/renderWithStoreAndRouter'

const userResponse = rest.get('https://randomuser.me/api/', (_request, response, context) => {
    return response(context.json(firstTenPatients))
})

// declare which API requests to mock
const server = setupServer(
    userResponse,
    rest.get('http://localhost:5010/true', async (_request, response, context) => {
        return response(context.json(firstTenPatients))
    }),
    // ...handlers,
)

// // setupServer
// establish API mocking before all tests
beforeAll(() => server.listen())
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => {
    server.resetHandlers()
    jest.resetModules()
    jest.clearAllMocks()
    cleanup()
})
// clean up once the tests are done
afterAll(() => server.close())

const memoryHistory = createMemoryHistory({ initialEntries: ['/'] })

describe('Unit Test for HomePage.tsx', () => {
    it('should renders with a logo', () => {
        renderWithRouterAndStore(<HomePage />, { path: '/', history: memoryHistory })
        const titles = screen.getAllByText('Pharma Inc.')
        expect(titles[0]).toBeInTheDocument()
    })

    it('should fetch data', async () => {
        renderWithRouterAndStore(<HomePage />)

        const loadings = screen.getAllByTestId('loading')
        expect(loadings[0]).toBeInTheDocument()

        const userName = await screen.findByText('Hugo Leonardo')
        expect(userName).toBeInTheDocument()
    })
})
