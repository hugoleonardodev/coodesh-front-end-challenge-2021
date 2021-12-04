import { routerMiddleware } from 'connected-react-router'
// import { createBrowserHistory } from 'history'
import { History } from 'history'
import { createStore, applyMiddleware, Store } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { TConfigsActionsCreators, TUserConfigs } from '@store/constants/configsTypes'
import { TPatientsActionsCreators } from '@store/constants/patientsTypes'
// import configsReducer from '@store/reducers/configsReducer'
import { TPatientsInitialState } from '@store/reducers/patientsReducer'

import customRootReducer from './customRootReducer'

// import rootReducer from './reducers/_rootReducer'

// export const history = createBrowserHistory()

function mockStore(
    history: History<unknown>,
    customConfigsReducer: (state?: TUserConfigs, action?: TConfigsActionsCreators | undefined) => TUserConfigs,
    customPatientsReducer: (
        state?: TPatientsInitialState,
        action?: TPatientsActionsCreators | undefined,
    ) => TPatientsInitialState,
): Store {
    const middlewares = [thunkMiddleware, routerMiddleware(history)]
    const middlewareEnhancer = applyMiddleware(...middlewares)

    const enhancers = middlewareEnhancer

    const store = createStore(customRootReducer(history, customConfigsReducer, customPatientsReducer), enhancers)

    return store
}

// const store = mockStore(history)

// export type RootStore = ReturnType<typeof rootReducer>

export default mockStore
