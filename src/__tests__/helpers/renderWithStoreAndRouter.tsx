import '@testing-library/jest-dom'
import customStore from '__tests__/mocks/store'
import { ConnectedRouter } from 'connected-react-router'
import { createMemoryHistory, History } from 'history'
import React from 'react'
import { Provider, RootStateOrAny } from 'react-redux'
// import store from 'store/index'
// import { history } from 'store/index'
import { Route } from 'react-router'
import { Store } from 'redux'
// import thunkMiddleware from 'redux-thunk'
import { ThemeProvider } from 'styled-components'

import goodContrastTheme from '@common/themes/goodContrastTheme'
import { TConfigsActionsCreators, TUserConfigs } from '@store/constants/configsTypes'
import { TPatientsActionsCreators } from '@store/constants/patientsTypes'
import store from '@store/index'
// import rootReducer from '@store/reducers/_rootReducer'
// import { Router } from 'react-router'
// import configsReducer from '@store/reducers/configsReducer'
import { TPatientsInitialState } from '@store/reducers/patientsReducer'

import { render } from './testUtils'

interface ICustomRouteConfig {
    path: string
    history: History<unknown>
}

const defaultHistory = createMemoryHistory()
const defaultRouteConfig = { path: '/', history: defaultHistory }

type TInitialStates = {
    configs?: TUserConfigs
    patients?: TPatientsInitialState
}

type TCustomReducers = {
    customConfigsReducer: (state?: TUserConfigs, action?: TConfigsActionsCreators | undefined) => TUserConfigs
    customPatientsReducer: (
        state?: TPatientsInitialState,
        action?: TPatientsActionsCreators | undefined,
    ) => TPatientsInitialState
}
export const getMockedStore = (
    initialState: TInitialStates,
    customReducers: TCustomReducers,
    // customHistory: ReturnType<typeof createMemoryHistory>,
): Store => {
    if (!initialState || !customReducers) {
        return store
    }

    // if (initialState.configs && initialState.patients) {

    return customStore(defaultHistory, customReducers.customConfigsReducer, customReducers.customPatientsReducer)
    // }
}

export const renderWithRouterAndStore = (
    component: React.ReactElement,
    routeConfigs: ICustomRouteConfig = defaultRouteConfig,
    customReducers: TCustomReducers,
    initialState?: RootStateOrAny,
): Record<string, unknown> => {
    const route = routeConfigs.path || '/'
    const store = getMockedStore(initialState, customReducers)
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
