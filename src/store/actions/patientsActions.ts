import { Dispatch } from 'redux'

import { getInitialPatientsList, getPatientsByPage } from '@services/api'
import { getSearchQuerySumit } from '@services/api'
import { ISetIsLoading, IUpdateApiQuery } from '@store/constants/configsTypes'
import {
    IListPatientsAction,
    IPaginationLoadPatientsAction,
    IRemoveSearchFilterAction,
    ISearchQuerySubmitAction,
    PatientsDataActions,
} from '@store/constants/patientsTypes'
import { IFilter, TPatientsInitialState } from '@store/constants/patientsTypes'
import { filterByQuery } from '@store/helpers/filterByQuery'

import { setIsLoading, updateApiQuery } from './configsActions'

/**
 * An action to set a list with the first 50 patients from the random user API.
 * @param patientsData
 * @endpoint https://randomuser.me/api/?seed=pharma&results=50
 * @returns returns an async `redux-thunk` function able to await for data and `dispatch` the result
 * @see https://randomuser.me/documentation
 */
export const initialListPatients = (patientsData: PatientsAPI.IPatientRootObject): IListPatientsAction => ({
    type: PatientsDataActions.INITIAL_LIST_PATIENTS,
    payload: patientsData,
})

/**
 * Async thunk to get the first page of patients from random user API.
 * @param none
 * @returns `<Promise>` an async `redux-thunk` function able to await for data and `dispatch` the result
 * @example
 * getInitialPatientsListThunk() =>
 *   async (dispatch: Dispatch<IListPatientsAction>): Promise<void> => {
 *      const firstFiftyPatientsData = await getInitialPatientsList()
 *
 *      const STATUS_OK = 200
 *
 *      if (firstFiftyPatientsData.status === STATUS_OK) {
 *          dispatch(initialListPatients(firstFiftyPatientsData.data))
 *      }
 *  }
 */
export const getInitialPatientsListThunk =
    () =>
    async (dispatch: Dispatch<IListPatientsAction | ISetIsLoading | IUpdateApiQuery>): Promise<void> => {
        const firstFiftyPatientsData = await getInitialPatientsList()

        dispatch(updateApiQuery(firstFiftyPatientsData.request.responseURL))

        if (firstFiftyPatientsData.status === __200_OK__) {
            dispatch(initialListPatients(firstFiftyPatientsData.data))
        }

        dispatch(setIsLoading(false))
    }

/**
 * An action to append more 50 patients from the random user API.
 * @param patientsData
 * @endpoint https://randomuser.me/api/?seed=pharma&page=2&results=50
 * @returns returns an async `redux-thunk` function able to await for data and `dispatch` the result
 * @see https://randomuser.me/documentation
 */
export const paginationLoadPatients = (
    patientsData: PatientsAPI.IPatientRootObject,
): IPaginationLoadPatientsAction => ({
    type: PatientsDataActions.PAGINATION_LOAD_PATIENTS,
    payload: patientsData,
})

/**
 * Async thunk to get a page of patients from random user API given the page number.
 * @param page
 * @default 1
 * @returns `<Promise>` an async `redux-thunk` function able to await for data and `dispatch` the result
 * @example
 * getInitialPatientsListThunk(2) =>
 *   async (dispatch: Dispatch<IPaginationLoadPatientsAction>): Promise<void> => {
 *      const moreFiftyPatientsData = await getPatientsByPage(2)
 *
 *      const STATUS_OK = 200
 *
 *      if (moreFiftyPatientsData.status === STATUS_OK) {
 *          dispatch(initialPaginationLoadPatients(moreFiftyPatientsData.data))
 *      }
 *  }
 */
export const getPatientsByPageThunk =
    (page = 1, gender = '') =>
    async (dispatch: Dispatch<IPaginationLoadPatientsAction | ISetIsLoading | IUpdateApiQuery>): Promise<void> => {
        dispatch(setIsLoading(true))

        const moreFiftyPatientsData = await getPatientsByPage(page, gender)

        dispatch(updateApiQuery(moreFiftyPatientsData.request.responseURL))

        if (moreFiftyPatientsData.status === __200_OK__) {
            dispatch(paginationLoadPatients(moreFiftyPatientsData.data))
        }

        dispatch(setIsLoading(false))
    }

/**
 * An action to append more 50 patients from the random user API.
 * @param patientsData
 * @endpoint https://randomuser.me/api/?seed=pharma&page=2&results=50
 * @returns returns an async `redux-thunk` function able to await for data and `dispatch` the result
 * @see https://randomuser.me/documentation
 */
export const searchQuerySubmit = (patientsData: TPatientsInitialState): ISearchQuerySubmitAction => ({
    type: PatientsDataActions.SEARCH_QUERY_SUBMIT,
    payload: patientsData,
})

/**
 * Async thunk to handle most of the async requests and `actions` on patients `redux` store's.
 * @param query
 * @default ''
 * @param queryFilter
 * @default []
 * @param filters
 * @default []
 * @param page
 * @default 1
 * @returns `<Promise>` an async `redux-thunk` function able to await for data and `dispatch` the result
 * @example
 * getInitialPatientsListThunk('madonna', [{ query: 'madonna', filter: 'name' }], [{ query: 'united states', filter: 'nation'} ], 2) =>
        async (dispatch: Dispatch<ISearchQuerySubmitAction | ISetIsLoading | IUpdateApiQuery>): Promise<void> => {
            dispatch(setIsLoading(true))

            const filteredPatients = await getSearchQuerySumit([{ query: 'madonna', filter: 'name' }], 2)

            dispatch(updateApiQuery(filteredPatients.request.responseURL))

            if (filteredPatients.status === __200_OK__) {
                dispatch(searchQuerySubmit(filterByQuery(
                    filteredPatients.data,
                    'madonna',
                    [{ query: 'madonna', filter: 'name' }],
                    [{ query: 'united states', filter: 'nation'}]
                )))
            }

            dispatch(setIsLoading(false))
        }
 */
export const getSearchQuerySubmitThunk =
    (query: string, queryFilters: IFilter[], filters: IFilter[], page = 1) =>
    async (dispatch: Dispatch<ISearchQuerySubmitAction | ISetIsLoading | IUpdateApiQuery>): Promise<void> => {
        dispatch(setIsLoading(true))

        const filteredPatients = await getSearchQuerySumit(queryFilters, filters, page)

        dispatch(updateApiQuery(filteredPatients.request.responseURL))

        if (filteredPatients.status === __200_OK__) {
            dispatch(searchQuerySubmit(filterByQuery(filteredPatients.data, query, queryFilters, filters)))
        }

        dispatch(setIsLoading(false))
    }

/**
 * An action to remove selected filter on `redux` store's patients `reducer`
 * @param index selected endpoint
 * @returns returns `action` type to `dispatch` the action
 */
export const removeSearchFilter = (index: number): IRemoveSearchFilterAction => ({
    type: PatientsDataActions.REMOVE_SEARCH_FILTER,
    payload: index,
})
