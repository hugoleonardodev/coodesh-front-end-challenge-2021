import firstTenPatients from '__tests__/mocks/json/firstTenPatients'
import { Reducer } from 'react'
import { Action, createStore } from 'redux'

import { PatientsDataActions } from '@store/constants/patientsTypes'
import patientsReducer, { TPatientsInitialState } from '@store/reducers/patientsReducer'
const initialState: TPatientsInitialState = {
    search: 'brazil',
    filters: [
        { query: 'brazil', filter: 'nation' },
        { query: 'silva', filter: 'name' },
    ],
    results: [...firstTenPatients.results],
    info: {
        seed: 'PharmaInc',
        results: 50,
        page: 1,
        version: '1.3',
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
                    type: PatientsDataActions.REMOVE_SEARCH_FILTER,
                    payload: 1,
                }),
            ),
        ).toEqual({
            ...initialState,
            filters: [{ query: 'brazil', filter: 'nation' }],
        })
    })

    it('should returns initial state when no action is given', () => {
        expect(reducer(initialState, patientsStore.dispatch({ type: null }))).toEqual({
            ...initialState,
        })
    })
})
