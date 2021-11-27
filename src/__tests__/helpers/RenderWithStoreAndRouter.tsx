import '@testing-library/jest-dom'
import { ConnectedRouter } from 'connected-react-router'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Provider, RootStateOrAny } from 'react-redux'
// import store from 'store/index'
// import { history } from 'store/index'
import { applyMiddleware, createStore, Reducer, Store } from 'redux'
import thunkMiddleware from 'redux-thunk'

import rootReducer from '@store/reducers/_rootReducer'
// import { Router } from 'react-router'
import { render } from '@testing-library/react'

interface ICustomRouteConfig {
    path: string
    history: ReturnType<typeof createMemoryHistory>
}

const defaultHistory = createMemoryHistory({ initialEntries: ['/'] })
const defaultRouteConfig = { path: '/', history: defaultHistory }

export const getMockedStore = (
    initialState?: Record<string, unknown>,
    customReducer?: Reducer,
    // customHistory: ReturnType<typeof createMemoryHistory>,
): Store => {
    if (!initialState || !customReducer) {
        return createStore(rootReducer(defaultHistory), applyMiddleware(thunkMiddleware))
    }

    return createStore(customReducer, initialState, applyMiddleware(thunkMiddleware))
}

export const RenderWithRouterAndStore = (
    component: React.ReactElement,
    routeConfigs: ICustomRouteConfig = defaultRouteConfig,
    initialState?: RootStateOrAny,
    customReducer?: Reducer,
): Record<string, unknown> => {
    const route = routeConfigs.path || '/'
    const store = getMockedStore(initialState, customReducer)
    const history = routeConfigs.history || createMemoryHistory({ initialEntries: [route] })

    return {
        ...render(
            <Provider store={store}>
                <ConnectedRouter history={history}>{component}</ConnectedRouter>
            </Provider>,
        ),
        store,
        history,
    }
}
