import React from 'react'

import { screen } from '@testing-library/react'

import App from '../../App'
// import { render } from '../helpers/TestRenderer'
import { render } from '../helpers/testUtils'

describe('App.tsx', () => {
    it('should render', async () => {
        render(<App />, {})
        const loading = screen.getByText('Loading...')
        expect(loading).toBeInTheDocument()
    })
})
