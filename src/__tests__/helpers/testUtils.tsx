import '@testing-library/jest-dom'
import React, { FC, ReactElement } from 'react'
import { Provider } from 'react-redux'

import { ConnectedRouter } from 'connected-react-router'

import { render, RenderOptions, RenderResult } from '@testing-library/react'

import store from '@store/index'
import { history } from '@store/index'

const AllTheProviders: FC = ({ children }) => {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>{children}</ConnectedRouter>
        </Provider>
    )
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>): RenderResult =>
    render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
