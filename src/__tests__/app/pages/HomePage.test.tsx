// Test renderer with Router and Store (Redux) for easy customizing tests entries
// import userEvent from '@testing-library/user-event'
// import { createMemoryHistory } from 'history'
// import * as reactRedux from 'react-redux'
// import * as redux from 'redux'
import firstTenPatients from '__tests__/mocks/json/firstTenPatients'
import { createMemoryHistory } from 'history'
// import API mocking utilities from Mock Service Worker
// import handlers from '__tests__/mocks/handlers'
// import axios from 'axios'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import React from 'react'
// import { useDispatch } from 'react-redux'

import HomePage from '@pages/HomePage'
import { screen, cleanup } from '@testing-library/react'

// import { render } from '../../helpers/testUtils'
import { renderWithRouterAndStore } from '../../helpers/renderWithStoreAndRouter'
const memoryHistory = createMemoryHistory({ initialEntries: ['/'] })
const userResponse = rest.get('https://randomuser.me/api/', (_request, response, context) => {
    // const query = request.url.searchParams
    // console.log(query)
    // const seed = query.get('seed')
    // console.log(seed)
    // const results = query.get('results')
    // console.log(results)
    // console.log('userResponse')
    return response(context.json(firstTenPatients))
})
// // declare which API requests to mock
const server = setupServer(
    userResponse,
    // // capture "GET /greeting" requests
    rest.get('http://localhost:5010/true', async (_request, response, context) => {
        // respond using a mocked JSON body
        // console.log('localhost')

        // const originalResponse = await context.fetch('https://randomuser.me/api/')
        // const originalResponseData = await originalResponse.json()
        // console.log('originalResponseData', originalResponseData)
        return response(context.json(firstTenPatients))
        // return response(context.status(200))
        // return response(originalResponseData)
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

// const axiosMock = {
//     get: jest.fn(() => Promise.resolve({ data: firstTenPatients })),
//     post: jest.fn(() => Promise.resolve({ data: {} })),
// }

describe('Unit Test for HomePage.tsx', () => {
    it('should renders with a logo', () => {
        renderWithRouterAndStore(<HomePage />, { path: '/', history: memoryHistory })
        const titles = screen.getAllByText('Pharma Inc.')
        expect(titles[0]).toBeInTheDocument()
    })

    // xit('should fetch data', async () => {
    //     render(<HomePage />)
    //     const cells = await screen.findAllByRole('cell')
    //     expect(cells.length).toBe(100)
    //     expect(cells).toBeInTheDocument()
    // })

    // const useSelectorMock = jest.spyOn('react-redux', 'useSelector')
    // const useDispatchMock = jest.spyOn(useDispatch, )

    // const mockDispatch = jest.fn()
    // jest.mock('react-redux', () => ({
    //     useSelector: jest.fn(),
    //     useDispatch: () => mockDispatch,
    // }))

    it('should fetch data', async () => {
        // const mockedDispatch = jest.fn()
        // useSelector.mockImplementation((selectorFn) => selectorFn(yourMockedStoreData));
        // useDispatch.mockReturnValue(mockedDispatch)
        // const mockAxios = jest.spyOn(axios, 'get')
        renderWithRouterAndStore(<HomePage />)

        const loadings = screen.getAllByTestId('loading')
        expect(loadings[0]).toBeInTheDocument()

        const userName = await screen.findByText('Hugo Leonardo')
        expect(userName).toBeInTheDocument()

        // await waitForElementToBeRemoved(loadings[0])
        // expect(mockDispatch).toHaveBeenCalled()
        // const patients = await screen.findAllByTestId('patient')
        // expect(patients[0]).toBeInTheDocument()
        // expect(mockAxios).toHaveBeenCalled()
        // const patient = await screen.findByText('Petersen, Marie')
        // expect(patient).toBeInTheDocument()
    })
})
