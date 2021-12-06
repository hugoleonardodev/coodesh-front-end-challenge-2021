import axios, { AxiosResponse } from 'axios'

import { IFilter } from '@store/constants/patientsTypes'

import generateQueryFilter from '../helpers/generateQueryFilter'

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
