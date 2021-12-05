import { renderWithRouterAndStore } from '__tests__/helpers/renderWithStoreAndRouter'
import firstTenPatients from '__tests__/mocks/json/firstTenPatients'
// import axios from 'axios'
import { createMemoryHistory } from 'history'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import React from 'react'

import NotFound from '@components/molecules/NotFound'
import HomePage from '@pages/HomePage'
import { ConfigsDataActions, TUserConfigs, TConfigsActionsCreators } from '@store/constants/configsTypes'
import { TPatientsActionsCreators } from '@store/constants/patientsTypes'
import { PatientsDataActions } from '@store/constants/patientsTypes'
import { screen, cleanup } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'

export interface IFilter {
    query: string
    filter: '' | 'name' | 'nation'
}

export type TPatientsInitialState = {
    search: string
    filters: IFilter[]
} & PatientsAPI.IPatientRootObject

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

const patientsReducer = (
    state: TPatientsInitialState = mockedPatients,
    action?: TPatientsActionsCreators,
): TPatientsInitialState => {
    if (action)
        switch (action.type) {
            case PatientsDataActions.REMOVE_SEARCH_FILTER:
                return {
                    ...state,
                    filters: [...state.filters.slice(0, action.payload), ...state.filters.slice(action.payload + 1)],
                }
            case PatientsDataActions.INITIAL_LIST_PATIENTS:
                return {
                    ...state,
                    results: [...state.results, ...action.payload.results],
                    info: {
                        seed: action.payload.info.seed,
                        results: state.info.results + action.payload.info.results,
                        page: action.payload.info.page,
                        version: action.payload.info.version,
                    },
                }
            case PatientsDataActions.PAGINATION_LOAD_PATIENTS:
                return {
                    ...state,
                    results: [...state.results, ...action.payload.results],
                    info: {
                        ...state.info,
                        results: state.info.results + action.payload.info.results,
                    },
                }
            case PatientsDataActions.SEARCH_QUERY_SUBMIT:
                return {
                    ...state,
                    search: action.payload.search,
                    filters: [...action.payload.filters],
                    results: [...action.payload.results],
                    info: {
                        results: action.payload.info.results,
                        page: action.payload.info.page,
                        seed: state.info.seed,
                        version: state.info.version,
                    },
                }

            default:
                return state
        }

    return state
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

const configsReducer = (state: TUserConfigs = mockedConfigs, action?: TConfigsActionsCreators): TUserConfigs => {
    if (action)
        switch (action.type) {
            case ConfigsDataActions.SWITCH_THEME:
                return { ...state, isDarkTheme: action.payload }
            case ConfigsDataActions.SET_IS_LOADING:
                return { ...state, isLoading: action.payload }
            case ConfigsDataActions.UPDATE_API_QUERY:
                return { ...state, apiQuery: action.payload }
            default:
                return state
        }
    return state
}

const initialStates = [mockedPatients, mockedConfigs]

const userResponse = rest.get('https://randomuser.me/api/', (_request, response, context) => {
    return response(context.json(firstTenPatients))
})

const server = setupServer(
    userResponse,
    rest.get('http://localhost:5010/true&page=1', async (_request, response, context) => {
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

// const TWO_FILTERS = 2

describe('Renders HomePage to test NotFound behavior', () => {
    it('should render a text when a patient is not found', async () => {
        renderWithRouterAndStore(
            <HomePage />,
            { path: '/', history: memoryHistory },
            { customConfigsReducer: configsReducer, customPatientsReducer: patientsReducer },
            initialStates,
        )

        const patientNotFound = screen.getByText('Patient not found.')
        expect(patientNotFound).toBeInTheDocument()
    })

    it('should render an image and a link when page is not found', async () => {
        const anyPageMemoryHistory = createMemoryHistory({ initialEntries: ['/any-page'] })
        renderWithRouterAndStore(
            <NotFound />,
            { path: '/any-page', history: anyPageMemoryHistory },
            { customConfigsReducer: configsReducer, customPatientsReducer: patientsReducer },
            initialStates,
        )

        // memoryHistory.replace('/any-page')

        const notFoundImage = await screen.findByRole('img')
        expect(notFoundImage).toBeInTheDocument()

        const notFoundLink = screen.getByRole('link', {
            name: /back to home/i,
        })
        expect(notFoundLink).toBeInTheDocument()
    })
})
