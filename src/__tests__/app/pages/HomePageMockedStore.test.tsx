import React from 'react'

import { createMemoryHistory } from 'history'

import { screen, cleanup } from '@testing-library/react'

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

afterEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
    cleanup()
})

describe('HomePage with a mocked store.tsx', () => {
    it('should render', async () => {
        renderWithRouterAndStore(<HomePage />, { path: '/', history: memoryHistory }, getMockedStore(initialStates))

        const firstPatient = screen.getByText('Petersen, Marie')
        expect(firstPatient).toBeInTheDocument()
    })
})
