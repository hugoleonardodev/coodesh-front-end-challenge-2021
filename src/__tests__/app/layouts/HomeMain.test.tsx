import React from 'react'

import { createMemoryHistory } from 'history'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { IMockedInitialStates, renderWithRouterAndStore } from '__tests__/helpers/renderWithStoreAndRouter'
import firstTenPatients from '__tests__/mocks/json/firstTenPatients'
import getMockedStore from '__tests__/mocks/store/getMockedStore'

import HomeMain from '@layouts/HomeMain'
import { TUserConfigs } from '@store/constants/configsTypes'
import { TPatientsInitialState } from '@store/constants/patientsTypes'

const mockedPatients: TPatientsInitialState = {
    search: 'brazil',
    filters: [
        { query: 'brazil', filter: 'nation' },
        { query: 'Petersen', filter: 'name' },
    ],
    ...firstTenPatients,
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

const userResponse = rest.get('https://randomuser.me/api/', (_request, response, context) => {
    return response(context.json(firstTenPatients))
})

const server = setupServer(
    userResponse,
    rest.get('http://localhost:5010/true&page=1&gender=female', async (_request, response, context) => {
        return response(context.json(firstTenPatients))
    }),
    rest.get('http://localhost:5010/true&page=1', async (_request, response, context) => {
        return response(context.json(firstTenPatients))
    }),
    rest.get('http://localhost:5010/true&nat=br&page=1', async (_request, response, context) => {
        return response(context.json(firstTenPatients))
    }),
)

beforeAll(() => server.listen())

afterEach(() => {
    server.resetHandlers()
    jest.resetModules()
    jest.clearAllMocks()
    cleanup()
})

afterAll(() => server.close())

const memoryHistory = createMemoryHistory({ initialEntries: ['/'] })

describe('HomeMain mocked store with two filters', () => {
    it('should render two filters and be able to click first one', async () => {
        renderWithRouterAndStore(<HomeMain />, { path: '/', history: memoryHistory }, getMockedStore(initialStates))

        const firstPatient = await screen.findByText('Petersen, Marie')
        expect(firstPatient).toBeInTheDocument()

        const filtersButton = screen.getAllByRole('button', {
            name: /nation\/brazil/i,
        })

        const TWO_FILTERS = 2
        expect(filtersButton.length).toBe(TWO_FILTERS)
        expect(filtersButton[1]).toBeInTheDocument()

        userEvent.click(filtersButton[1])
    })

    it('should render two filters and be able to click last one', async () => {
        renderWithRouterAndStore(<HomeMain />, { path: '/', history: memoryHistory }, getMockedStore(initialStates))

        const firstPatient = await screen.findByText('Petersen, Marie')
        expect(firstPatient).toBeInTheDocument()

        const filtersButton = screen.getAllByRole('button', {
            name: /name\/petersen/i,
        })

        const TWO_FILTERS = 2
        expect(filtersButton.length).toBe(TWO_FILTERS)
        expect(filtersButton[1]).toBeInTheDocument()

        userEvent.click(filtersButton[1])
    })
})
