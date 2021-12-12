import { IMockedInitialStates } from '__tests__/helpers/renderWithStoreAndRouter'

import { ConfigsDataActions, TConfigsActionsCreators, TUserConfigs } from '@store/constants/configsTypes'
import { PatientsDataActions, TPatientsActionsCreators, TPatientsInitialState } from '@store/constants/patientsTypes'

export interface IMockedStoreReducers {
    configs: (state?: TUserConfigs, action?: TConfigsActionsCreators | undefined) => TUserConfigs
    patients: (state?: TPatientsInitialState, action?: TPatientsActionsCreators | undefined) => TPatientsInitialState
}

const getMockedStore = (initialState: IMockedInitialStates): IMockedStoreReducers => {
    const mockedConfigsReducer = (
        state: TUserConfigs = initialState.configs,
        action?: TConfigsActionsCreators,
    ): TUserConfigs => {
        if (action)
            switch (action.type) {
                case ConfigsDataActions.SWITCH_THEME:
                    return { ...state, isDarkTheme: action.payload }
                case ConfigsDataActions.SET_IS_LOADING:
                    return { ...state, isLoading: action.payload }
                case ConfigsDataActions.UPDATE_API_QUERY:
                    return { ...state, apiQuery: action.payload }
                default:
                    return state
            }
        return state
    }

    const mockedPatientsReducer = (
        state: TPatientsInitialState = initialState.patients,
        action?: TPatientsActionsCreators,
    ): TPatientsInitialState => {
        if (action)
            switch (action.type) {
                case PatientsDataActions.REMOVE_SEARCH_FILTER:
                    return {
                        ...state,
                        filters: [
                            ...state.filters.slice(0, action.payload),
                            ...state.filters.slice(action.payload + 1),
                        ],
                    }
                case PatientsDataActions.INITIAL_LIST_PATIENTS:
                    return {
                        ...state,
                        results: [...state.results, ...action.payload.results],
                        info: {
                            seed: action.payload.info.seed,
                            results: state.info.results + action.payload.info.results,
                            page: action.payload.info.page,
                            version: action.payload.info.version,
                        },
                    }
                case PatientsDataActions.PAGINATION_LOAD_PATIENTS:
                    return {
                        ...state,
                        results: [...state.results, ...action.payload.results],
                        info: {
                            ...state.info,
                            results: state.info.results + action.payload.info.results,
                        },
                    }
                case PatientsDataActions.SEARCH_QUERY_SUBMIT:
                    return {
                        ...state,
                        search: action.payload.search,
                        filters: [...action.payload.filters],
                        results: [...action.payload.results],
                        info: {
                            results: action.payload.info.results,
                            page: action.payload.info.page,
                            seed: state.info.seed,
                            version: state.info.version,
                        },
                    }

                default:
                    return state
            }

        return state
    }

    return { configs: mockedConfigsReducer, patients: mockedPatientsReducer }
}

export default getMockedStore
