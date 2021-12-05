import { IFilter, TPatientsInitialState } from '@store/constants/patientsTypes'

import { filterByName } from './filterByName'
import { filterByNation } from './filterByNation'

export const filterByQuery = (
    data: PatientsAPI.IPatientRootObject,
    query: string,
    queryFilters: IFilter[],
    filters: IFilter[],
): TPatientsInitialState => {
    let filteredData = {}
    if (queryFilters.some(filter => filter.filter === 'name')) {
        filteredData = filterByName(data, query, queryFilters, filters)
        return filteredData as TPatientsInitialState
    }
    if (queryFilters.some(filter => filter.filter === 'nation')) {
        filteredData = filterByNation(data, query, queryFilters, filters)
        return filteredData as TPatientsInitialState
    }
    if (filters.length === 0) filteredData = filterByName(data, query, queryFilters, filters)

    return filteredData as TPatientsInitialState
}
