import { TPatientsActionsCreators } from '@store/constants/patientsTypes'
import { PatientsDataActions } from '@store/constants/patientsTypes'

export type TPatientsInitialState = {
    search: string
    filter: '' | 'name' | 'nation'
} & PatientsAPI.IPatientRootObject

const initialState: TPatientsInitialState = {
    search: '',
    filter: '',
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
                filter: action.payload.filter,
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
