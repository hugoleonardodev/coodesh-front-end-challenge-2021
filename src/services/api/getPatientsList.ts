import axios, { AxiosResponse } from 'axios'

const getInitialPatientsList = async (): Promise<AxiosResponse<never>> => {
    const url = __API_BASE_URL__

    const result = await axios({
        url,
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
        },
    })

    return result
}

export default getInitialPatientsList
