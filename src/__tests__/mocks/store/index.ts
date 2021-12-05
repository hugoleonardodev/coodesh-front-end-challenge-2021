import { routerMiddleware } from 'connected-react-router'
import { History } from 'history'
import { createStore, applyMiddleware, Store } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { TConfigsActionsCreators, TUserConfigs } from '@store/constants/configsTypes'
import { TPatientsActionsCreators } from '@store/constants/patientsTypes'
import { TPatientsInitialState } from '@store/reducers/patientsReducer'

import customRootReducer from './customRootReducer'

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

export default mockStore
