import '@testing-library/jest-dom'
import React from 'react'
import { Provider } from 'react-redux'
import { Route } from 'react-router'

import { ConnectedRouter } from 'connected-react-router'
import { createMemoryHistory, History } from 'history'
import { Store } from 'redux'
import { ThemeProvider } from 'styled-components'

import customStore from '__tests__/mocks/store'

import goodContrastTheme from '@common/themes/goodContrastTheme'
import { TConfigsActionsCreators, TUserConfigs } from '@store/constants/configsTypes'
import { TPatientsActionsCreators, TPatientsInitialState } from '@store/constants/patientsTypes'
import store from '@store/index'

import { render } from './testUtils'

interface ICustomRouteConfig {
    path: string
    history: History<unknown>
}

const defaultHistory = createMemoryHistory()
const defaultRouteConfig = { path: '/', history: defaultHistory }

export interface IMockedInitialStates {
    configs: TUserConfigs
    patients: TPatientsInitialState
}

type TCustomReducers = {
    configs: (state?: TUserConfigs, action?: TConfigsActionsCreators | undefined) => TUserConfigs
    patients: (state?: TPatientsInitialState, action?: TPatientsActionsCreators | undefined) => TPatientsInitialState
}
export const hasMockedStore = (customReducers?: TCustomReducers): Store => {
    if (!customReducers) {
        return store
    }

    return customStore(defaultHistory, customReducers.configs, customReducers.patients)
}

export const renderWithRouterAndStore = (
    component: React.ReactElement,
    routeConfigs: ICustomRouteConfig = defaultRouteConfig,
    customReducers?: TCustomReducers,
): Record<string, unknown> => {
    const route = routeConfigs.path || '/'
    const store = hasMockedStore(customReducers)
    const history = routeConfigs.history || createMemoryHistory({ initialEntries: [route] })

    return {
        ...render(
            <React.StrictMode>
                <Provider store={store}>
                    <ThemeProvider theme={goodContrastTheme}>
                        <ConnectedRouter history={history}>
                            <Route path={routeConfigs.path}>{component}</Route>
                        </ConnectedRouter>
                    </ThemeProvider>
                </Provider>
            </React.StrictMode>,
        ),
        store,
        history,
    }
}
