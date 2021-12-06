import React from 'react'

import { createMemoryHistory } from 'history'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { IMockedInitialStates, renderWithRouterAndStore } from '__tests__/helpers/renderWithStoreAndRouter'
import firstTenPatients from '__tests__/mocks/json/firstTenPatients'
import getMockedStore from '__tests__/mocks/store/getMockedStore'

import HomePage from '@pages/HomePage'
import { TUserConfigs } from '@store/constants/configsTypes'
import { TPatientsInitialState } from '@store/constants/patientsTypes'

const mockedPatients: TPatientsInitialState = {
    search: '',
    filters: [],
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

const memoryHistory = createMemoryHistory({ initialEntries: ['/'] })

const initialStates: IMockedInitialStates = {
    configs: mockedConfigs,
    patients: mockedPatients,
}

const userResponse = rest.get('https://randomuser.me/api/', (_request, response, context) => {
    return response(context.json(firstTenPatients))
})

const server = setupServer(
    userResponse,
    rest.get('http://localhost:5010/true&page=1', async (_request, response, context) => {
        return response(context.json(firstTenPatients))
    }),
    rest.get('http://localhost:5010/true&nat=nation&page=1', async (_request, response, context) => {
        return response(context.json(firstTenPatients))
    }),
    // ...handlers,
)

beforeAll(() => server.listen())

afterEach(() => {
    server.resetHandlers()
    jest.resetModules()
    jest.clearAllMocks()
    cleanup()
})

afterAll(() => server.close())

describe('Renders HomePage to test SearchFilter behavior', () => {
    it('should be able to type and search for a query', async () => {
        renderWithRouterAndStore(<HomePage />, { path: '/', history: memoryHistory }, getMockedStore(initialStates))

        const inputSearch = screen.getByRole('textbox', {
            name: /search for\.{3}/i,
        })
        expect(inputSearch).toBeInTheDocument()

        userEvent.type(inputSearch, 'brazil')

        const selectFilter = screen.getByRole('combobox', {
            name: /filter:/i,
        })
        expect(selectFilter).toBeInTheDocument()

        userEvent.click(selectFilter)

        const nationOption = screen.getByRole('option', { name: /nationality/i })
        expect(nationOption).toBeInTheDocument()
        expect(nationOption).toBeVisible()

        userEvent.click(nationOption)

        const searchButton = screen.getByTestId('search-button')
        expect(searchButton).toBeInTheDocument()
    })
})
