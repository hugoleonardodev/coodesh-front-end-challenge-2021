import React from 'react'

import { createMemoryHistory } from 'history'
import { setupServer } from 'msw/node'

import { screen, cleanup } from '@testing-library/react'

import { IMockedInitialStates, renderWithRouterAndStore } from '__tests__/helpers/renderWithStoreAndRouter'
import handlers from '__tests__/mocks/msw/handlers'
import getMockedStore from '__tests__/mocks/store/getMockedStore'

import NotFound from '@components/molecules/NotFound'
import HomePage from '@pages/HomePage'
import { TUserConfigs } from '@store/constants/configsTypes'
import { TPatientsInitialState } from '@store/constants/patientsTypes'

const mockedPatients: TPatientsInitialState = {
    search: 'madonna',
    filters: [
        { query: 'brazil', filter: 'nation' },
        { query: 'madonna', filter: 'name' },
    ],
    results: [],
    info: {
        seed: 'PharmaInc',
        results: 10,
        page: 1,
        version: '1.3',
    },
}

const mockedConfigs: TUserConfigs = {
    user: 'Hugo Leonardo',
    email: 'hugoleonardo.dev@gmail.com',
    avatar: 'https://github.com/hugoleonardodev.png',
    isDarkTheme: false,
    isLoading: false,
    apiQuery: '',
}

const initialStates: IMockedInitialStates = {
    configs: mockedConfigs,
    patients: mockedPatients,
}

const memoryHistory = createMemoryHistory({ initialEntries: ['/'] })

const server = setupServer(...handlers)

beforeAll(() => server.listen())

afterEach(() => {
    server.resetHandlers()
    jest.resetModules()
    jest.clearAllMocks()
    cleanup()
})

afterAll(() => server.close())

describe('Renders HomePage to test NotFound behavior', () => {
    it('should render a text when a patient is not found', async () => {
        renderWithRouterAndStore(<HomePage />, { path: '/', history: memoryHistory }, getMockedStore(initialStates))

        const patientNotFound = screen.getByText('Patient not found.')
        expect(patientNotFound).toBeInTheDocument()
    })

    it('should render an image and a link when page is not found', async () => {
        const anyPageMemoryHistory = createMemoryHistory({ initialEntries: ['/any-page'] })
        renderWithRouterAndStore(
            <NotFound />,
            { path: '/any-page', history: anyPageMemoryHistory },
            getMockedStore(initialStates),
        )

        const notFoundImage = await screen.findByRole('img')
        expect(notFoundImage).toBeInTheDocument()

        const notFoundLink = screen.getByRole('link', {
            name: /back to home/i,
        })
        expect(notFoundLink).toBeInTheDocument()
    })
})
