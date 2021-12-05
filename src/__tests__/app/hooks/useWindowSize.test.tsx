import { renderWithRouterAndStore } from '__tests__/helpers/renderWithStoreAndRouter'
import { cleanup, screen } from '__tests__/helpers/testUtils'
import React from 'react'

import { useWindowSize } from '@common/hooks'

const TestComponentMock: React.FC = () => {
    const [width, height] = useWindowSize()
    return (
        <div>
            <p>
                width: <span data-testid="width">{width}</span>{' '}
            </p>
            <p>
                height: <span data-testid="height">{height}</span>{' '}
            </p>
        </div>
    )
}

export default TestComponentMock

afterEach(() => {
    // server.resetHandlers()
    jest.resetModules()
    jest.clearAllMocks()
    cleanup()
})

describe('useWindowSize hook', () => {
    it('should catch the width and size of the screen', async () => {
        renderWithRouterAndStore(<TestComponentMock />)

        const width = screen.getByTestId(/width/)
        expect(width).toBeInTheDocument()
        expect(width).toHaveTextContent('1024')

        const height = screen.getByTestId(/height/)
        expect(height).toBeInTheDocument()
        expect(height).toHaveTextContent('768')
    })
})
