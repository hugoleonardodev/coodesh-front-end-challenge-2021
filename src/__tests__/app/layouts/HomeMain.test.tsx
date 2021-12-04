import { render } from '__tests__/helpers/testUtils'
import React from 'react'

import HomeMain from '@layouts/HomeMain'
import { screen } from '@testing-library/react'

// import { render } from '../helpers/TestRenderer'

describe('HomeMain.tsx', () => {
    it('should render', async () => {
        render(<HomeMain />, {})
        const logo = screen.getByText('Pharma Inc.')
        expect(logo).toBeInTheDocument()

        const notFound = screen.getByText('Patient not found')
        expect(notFound).toBeInTheDocument()
    })
})
