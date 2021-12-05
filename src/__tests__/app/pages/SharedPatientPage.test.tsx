import React from 'react'

import { screen, cleanup } from '@testing-library/react'

import { render } from '__tests__/helpers/testUtils'

import SharedPatientPage from '@pages/SharePatientPage'

afterEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
    cleanup()
})
describe('SharedPatientPage.tsx', () => {
    it('should render', async () => {
        render(<SharedPatientPage />, {})
        const logo = screen.getByText('Pharma Inc.')
        expect(logo).toBeInTheDocument()

        const notFound = screen.getByText('Patient not found')
        expect(notFound).toBeInTheDocument()
    })
})
