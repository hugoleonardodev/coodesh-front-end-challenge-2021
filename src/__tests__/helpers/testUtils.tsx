import '@testing-library/jest-dom'
import React, { FC, ReactElement } from 'react'
import { Provider } from 'react-redux'

import axios from 'axios'
import { ConnectedRouter } from 'connected-react-router'

import { render, RenderOptions, RenderResult } from '@testing-library/react'

import store from '@store/index'
import { history } from '@store/index'

export const app = axios.create({
    baseURL: 'https://randomuser.me/api/',
})

app.interceptors.response.use(
    response => response,
    //   error => {
    //     const err = get(error, ["response", "data", "err"]);
    //     return err ? Promise.reject(err) : Promise.reject(error.message);
    //   }
)

export default app

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
