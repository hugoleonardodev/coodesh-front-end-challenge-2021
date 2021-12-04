import { render } from '__tests__/helpers/testUtils'
import React from 'react'

import SharedPatientPage from '@pages/SharePatientPage'
import { screen } from '@testing-library/react'

// import { render } from '../helpers/TestRenderer'

describe('SharedPatientPage.tsx', () => {
    it('should render', async () => {
        render(<SharedPatientPage />, {})
        const logo = screen.getByText('Pharma Inc.')
        expect(logo).toBeInTheDocument()

        const notFound = screen.getByText('Patient not found')
        expect(notFound).toBeInTheDocument()
    })
})
