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

const memoryHistory = createMemoryHistory({ initialEntries: ['/'] })

describe('Renders HomePage to test TablePatients behavior', () => {
    it('should sort the patient list on ascendent order', async () => {
        renderWithRouterAndStore(<HomePage />, { path: '/', history: memoryHistory }, getMockedStore(initialStates))

        const firstPatient = screen.getByText('Petersen, Marie')
        expect(firstPatient).toBeInTheDocument()

        const sortAscendentButton = screen.getByTestId('table-sort-down')
        expect(sortAscendentButton).toBeInTheDocument()

        userEvent.click(sortAscendentButton)

        const sortDescendentButton = await screen.findByTestId('table-sort-up')
        expect(sortDescendentButton).toBeInTheDocument()
    })

    it('should sort the patient list on descendent order', async () => {
        renderWithRouterAndStore(<HomePage />, { path: '/', history: memoryHistory }, getMockedStore(initialStates))

        const firstPatient = screen.getByText('Petersen, Marie')
        expect(firstPatient).toBeInTheDocument()

        const sortAscendentButton = screen.getByTestId('table-sort-down')
        expect(sortAscendentButton).toBeInTheDocument()

        userEvent.click(sortAscendentButton)

        const sortDescendentButton = await screen.findByTestId('table-sort-up')
        expect(sortDescendentButton).toBeInTheDocument()

        userEvent.click(sortDescendentButton)
    })

    it('should be able to click on patient gender dropdown and select a gender', async () => {
        renderWithRouterAndStore(<HomePage />, { path: '/', history: memoryHistory }, getMockedStore(initialStates))

        const genderDropdownToggle = screen.getByTestId('gender-dropdown-toggle')
        expect(genderDropdownToggle).toBeInTheDocument()

        userEvent.click(genderDropdownToggle)

        const femaleGender = await screen.findByTestId('female-gender')
        expect(femaleGender).toBeInTheDocument()

        userEvent.click(femaleGender)
    })

    it('should be able to click on share patient button', async () => {
        renderWithRouterAndStore(<HomePage />, { path: '/', history: memoryHistory }, getMockedStore(initialStates))

        const firstPatient = screen.getByText('Petersen, Marie')
        expect(firstPatient).toBeInTheDocument()

        const sharePatientButton = screen.getByTestId('share-patient-1')
        expect(sharePatientButton).toBeInTheDocument()

        userEvent.click(sharePatientButton)
    })
})
