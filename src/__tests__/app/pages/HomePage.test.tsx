// Test renderer with Router and Store (Redux) for easy customizing tests entries
// import userEvent from '@testing-library/user-event'
// import { createMemoryHistory } from 'history'
import React from 'react'
import { useDispatch } from 'react-redux'

import HomePage from '@pages/HomePage'
import { screen } from '@testing-library/react'

// import { renderWithRouterAndStore } from '../../helpers/RenderWithStoreAndRouter'
// import { render } from '../../helpers/TestRenderer'
import { render } from '../../helpers/testUtils'

describe('Unit Test for HomePage.tsx', () => {
    xit('should renders with a logo', () => {
        render(<HomePage />)
        const titles = screen.getAllByText('Pharma Inc.')
        expect(titles[0]).toBeInTheDocument()
    })

    xit('should fetch data', async () => {
        render(<HomePage />)
        const cells = await screen.findAllByRole('cell')
        expect(cells.length).toBe(100)
        expect(cells).toBeInTheDocument()
    })

    // const useSelectorMock = jest.spyOn('react-redux', 'useSelector')
    // const useDispatchMock = jest.spyOn('react-redux', useDispatch)

    // const mockDispatch = jest.fn()
    // jest.mock('react-redux', () => ({
    //     useSelector: jest.fn(),
    //     useDispatch: () => mockDispatch,
    // }))

    it('should fetch data', async () => {
        // const mockedDispatch = jest.fn()
        // useSelector.mockImplementation((selectorFn) => selectorFn(yourMockedStoreData));
        // useDispatch.mockReturnValue(mockedDispatch)
        render(<HomePage />)
        const firstPatient = await screen.findByText('Petersen, Marie')
        expect(firstPatient).toBeInTheDocument()
        // expect(useDispatchMock).toHaveBeenCalled()
    })
})
