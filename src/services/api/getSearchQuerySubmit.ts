import axios, { AxiosResponse } from 'axios'

import { getCountryCodeByName } from '@common/functions'
import { IFilter } from '@store/constants/patientsTypes'

const generateQueryFilter = (queryFilter: IFilter[], filters: IFilter[]) => {
    const queryHasNationFilter = queryFilter.find(({ filter }) => filter === 'nation')
    const filterHasNationFilter = filters.find(({ filter }) => filter === 'nation')
    if (queryHasNationFilter) {
        const countryCode = getCountryCodeByName(queryHasNationFilter.query)
        return `&nat=${countryCode.toLowerCase()}`
    }
    if (filterHasNationFilter) {
        const countryCode = getCountryCodeByName(filterHasNationFilter.query)
        return `&nat=${countryCode.toLowerCase()}`
    }
    return ''
}

const getSearchQuerySumit = async (
    queryFilter: IFilter[],
    filters: IFilter[],
    page = 1,
): Promise<AxiosResponse<never>> => {
    const allFilters = generateQueryFilter(queryFilter, filters)

    const url = `${__API_BASE_URL__}${allFilters}&page=${page}`

    const result = await axios({
        url,
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
        },
    })

    return result
}

export default getSearchQuerySumit
