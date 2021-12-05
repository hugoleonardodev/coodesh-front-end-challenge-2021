import { IFilter, TPatientsInitialState } from '@store/constants/patientsTypes'

export const filterByName = (
    data: PatientsAPI.IPatientRootObject,
    query: string,
    queryFilters: IFilter[],
    filters: IFilter[],
): TPatientsInitialState => {
    const filteredData: TPatientsInitialState = {
        ...data,
        filters: filters.length > 0 ? [...queryFilters, ...filters] : [...queryFilters],
        search: query,
        results: [
            ...data.results.filter(
                patient =>
                    patient.name.first.toLowerCase().includes(query.toLowerCase()) ||
                    patient.name.last.toLowerCase().includes(query.toLowerCase()),
            ),
        ],
    }
    return filteredData
}
