import { TPatientsInitialState } from '@store/reducers/patientsReducer'

import { TUserConfigs } from './configsTypes'

export interface IRootStateWithReducers {
    configs: TUserConfigs
    patients: TPatientsInitialState
    router: History
}
