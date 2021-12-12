import { getCountryCodeByName } from '@common/functions'
import { IFilter } from '@store/constants/patientsTypes'

const generateQueryFilter = (queryFilter: IFilter[], filters: IFilter[]): string => {
    const queryHasNationFilter = queryFilter.find(({ filter }) => filter === 'nation')
    if (queryHasNationFilter) {
        const countryCode = getCountryCodeByName(queryHasNationFilter.query)
        return `&nat=${countryCode.toLowerCase()}`
    }
    const filterHasNationFilter = filters.find(({ filter }) => filter === 'nation')
    if (filterHasNationFilter) {
        const countryCode = getCountryCodeByName(filterHasNationFilter.query)
        return `&nat=${countryCode.toLowerCase()}`
    }
    return ''
}

export default generateQueryFilter
