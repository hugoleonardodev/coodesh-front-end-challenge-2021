import { renderWithRouterAndStore } from '__tests__/helpers/renderWithStoreAndRouter'
import { cleanup, screen } from '__tests__/helpers/testUtils'
// import firstTenPatients from '__tests__/mocks/json/firstTenPatients'
import React from 'react'

import { useIntersectionObserver } from '@common/hooks'
import InfinityScroll from '@components/organisms/InfinityScroll'

const TestComponentMock: React.FC = () => {
    const infinityScrollBottomReference = React.useRef<HTMLDivElement | null>(null)
    const entry = useIntersectionObserver(infinityScrollBottomReference, {})
    const isVisible = !!entry?.isIntersecting

    return (
        <div>
            <div data-testid="is-visible">{JSON.stringify(isVisible)}</div>
            <InfinityScroll isBottomVisible={isVisible} />
            <div ref={infinityScrollBottomReference} />
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

        const isVisible = screen.getByTestId('is-visible')
        expect(isVisible).toBeInTheDocument()
        expect(isVisible).toHaveTextContent('false')
    })
})
