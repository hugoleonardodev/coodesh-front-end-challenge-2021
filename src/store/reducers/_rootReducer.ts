import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { combineReducers, Reducer } from 'redux'

import configsReducer from './configsReducer'
import patientsReducer from './patientsReducer'

const rootReducer = (history: History<unknown>): Reducer =>
    combineReducers({
        configs: configsReducer,
        patients: patientsReducer,
        router: connectRouter(history),
    })

export default rootReducer
