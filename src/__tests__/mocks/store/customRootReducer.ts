import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { combineReducers, Reducer } from 'redux'

import configsReducer from '@store/reducers/configsReducer'
import patientsReducer from '@store/reducers/patientsReducer'

const customRootReducer = (
    history: History<unknown>,
    customConfigsReducer = configsReducer,
    customPatientsReducer = patientsReducer,
): Reducer =>
    combineReducers({
        configs: customConfigsReducer,
        patients: customPatientsReducer,
        router: connectRouter(history),
    })

export default customRootReducer
