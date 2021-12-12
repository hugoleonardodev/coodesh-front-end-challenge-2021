import React from 'react'

import { createMemoryHistory } from 'history'

import { screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { IMockedInitialStates, renderWithRouterAndStore } from '__tests__/helpers/renderWithStoreAndRouter'
import firstTenPatients from '__tests__/mocks/json/firstTenPatients'
import getMockedStore from '__tests__/mocks/store/getMockedStore'

import SharedPatientPage from '@pages/SharePatientPage'
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
    apiQuery: 'brazil',
}

const memoryHistory = createMemoryHistory({ initialEntries: ['/patient/ac9abe6c-4c24-4576-95e8-3e8e42d080a9'] })

const initialStates: IMockedInitialStates = {
    configs: mockedConfigs,
    patients: mockedPatients,
}

afterEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
    cleanup()
})

describe('SharedPatientPage.tsx', () => {
    it('should render', async () => {
        renderWithRouterAndStore(
            <SharedPatientPage />,
            { path: '/patient/ac9abe6c-4c24-4576-95e8-3e8e42d080a9', history: memoryHistory },
            getMockedStore(initialStates),
        )
        const logo = screen.getByText('Copy to clipboard:')
        expect(logo).toBeInTheDocument()

        const copyToClpiboardButton = screen.getByRole('button', { name: /copy/i })
        expect(copyToClpiboardButton).toBeInTheDocument()

        const mockedAlert = jest
            .spyOn(window, 'alert')
            .mockImplementation(() => 'Clipboard not supported by this browser.')

        userEvent.click(copyToClpiboardButton)
        expect(mockedAlert).toHaveBeenCalled()
        expect(mockedAlert).toHaveBeenCalledWith('Clipboard not supported by this browser.')
    })
})
