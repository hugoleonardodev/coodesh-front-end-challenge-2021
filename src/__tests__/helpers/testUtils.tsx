import '@testing-library/jest-dom'
import { ConnectedRouter } from 'connected-react-router'
import React, { FC, ReactElement } from 'react'
import { Provider } from 'react-redux'

import store from '@store/index'
import { history } from '@store/index'
import { render, RenderOptions, RenderResult } from '@testing-library/react'

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
