import { TUserConfigs } from './configsTypes'
import { TPatientsInitialState } from './patientsTypes'

export interface IRootStateWithReducers {
    configs: TUserConfigs
    patients: TPatientsInitialState
    router: History
}
