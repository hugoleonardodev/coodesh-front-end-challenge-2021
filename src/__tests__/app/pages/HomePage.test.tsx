import React from 'react'

import { createMemoryHistory } from 'history'
import { setupServer } from 'msw/node'

import { screen, cleanup } from '@testing-library/react'

import handlers from '__tests__/mocks/msw/handlers'

import HomePage from '@pages/HomePage'

import { renderWithRouterAndStore } from '../../helpers/renderWithStoreAndRouter'

const server = setupServer(...handlers)

beforeAll(() => server.listen())

afterEach(() => {
    server.resetHandlers()
    jest.resetModules()
    jest.clearAllMocks()
    cleanup()
})

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
