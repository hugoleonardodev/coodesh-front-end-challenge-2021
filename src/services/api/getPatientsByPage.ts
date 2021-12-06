import axios, { AxiosResponse } from 'axios'

import { IFilter } from '@store/constants/patientsTypes'

import generateQueryFilter from '../helpers/generateQueryFilter'

const getPatientsByPage = async (
    page = 1,
    gender = '',
    queryFilters: IFilter[] = [],
    filters: IFilter[] = [],
): Promise<AxiosResponse<never>> => {
    let url = `${__API_BASE_URL__}&page=${page}`

    const hasFilters = generateQueryFilter(queryFilters, filters)

    if (gender !== '') {
        url = ` https://randomuser.me/api/?gender=${gender}&results=50${hasFilters}`
    }

    const result = await axios({
        url,
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
        },
    })

    return result
}

export default getPatientsByPage
