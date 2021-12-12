import { Action, createStore, Reducer } from 'redux'

import firstTenPatients from '__tests__/mocks/json/firstTenPatients'

import { PatientsDataActions, TPatientsInitialState } from '@store/constants/patientsTypes'
import patientsReducer from '@store/reducers/patientsReducer'

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

const reducer = patientsReducer as Reducer<TPatientsInitialState, Action<unknown>>

const patientsStore = createStore(reducer)

describe('Patients Reducer', () => {
    it('should handle initial patients list with given results', () => {
        expect(
            reducer(
                initialState,
                patientsStore.dispatch({
                    type: PatientsDataActions.INITIAL_LIST_PATIENTS,
                    payload: {
                        search: '',
                        filters: [],
                        ...firstTenPatients,
                    },
                }),
            ),
        ).toEqual({
            ...initialState,
            ...firstTenPatients,
        })
    })

    it('should loads more patients with paginations', () => {
        expect(
            reducer(
                initialState,
                patientsStore.dispatch({
                    type: PatientsDataActions.PAGINATION_LOAD_PATIENTS,
                    payload: {
                        ...initialState,
                        results: firstTenPatients.results,
                        info: {
                            seed: 'PharmaInc',
                            results: 50,
                            page: 1,
                            version: '1.3',
                        },
                    },
                }),
            ),
        ).toEqual({
            ...initialState,
            results: firstTenPatients.results,
            info: {
                seed: '',
                results: 50,
                page: 1,
                version: '',
            },
        })
    })

    it('should loads a serach query submit', () => {
        expect(
            reducer(
                initialState,
                patientsStore.dispatch({
                    type: PatientsDataActions.SEARCH_QUERY_SUBMIT,
                    payload: {
                        search: 'brazil',
                        filters: [{ query: 'brazil', filter: 'nation' }],
                        results: firstTenPatients.results,
                        info: {
                            seed: 'PharmaInc',
                            results: 50,
                            page: 1,
                            version: '1.3',
                        },
                    },
                }),
            ),
        ).toEqual({
            search: 'brazil',
            filters: [{ query: 'brazil', filter: 'nation' }],
            results: firstTenPatients.results,
            info: {
                seed: '',
                results: 50,
                page: 1,
                version: '',
            },
        })
    })
})
