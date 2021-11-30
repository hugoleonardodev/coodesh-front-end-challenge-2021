import { TPatientsActionsCreators } from '@store/constants/patientsTypes'
import { PatientsDataActions } from '@store/constants/patientsTypes'

export interface IFilter {
    query: string
    filter: '' | 'name' | 'nation'
}

export type TPatientsInitialState = {
    search: string
    filters: IFilter[]
} & PatientsAPI.IPatientRootObject

const initialState: TPatientsInitialState = {
    search: '',
    filters: [],
    results: [],
    info: {
        seed: '',
        results: 0,
        page: 0,
        version: '',
    },
}

const patientsReducer = (
    state: TPatientsInitialState = initialState,
    action: TPatientsActionsCreators,
): TPatientsInitialState => {
    switch (action.type) {
        case PatientsDataActions.REMOVE_SEARCH_FILTER:
            return {
                ...state,
                filters: [...state.filters.slice(0, action.payload), ...state.filters.slice(action.payload + 1)],
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
                filters: [...state.filters, ...action.payload.filters],
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
}

export default patientsReducer
