import nationalities from '../json/nationalities.json'

const getCountryCodeByName = (countryName: string): string => {
    const country = nationalities.find(({ name }) => name.toLowerCase().includes(countryName.toLowerCase()))
    if (country) return country.code
    return countryName
}

export default getCountryCodeByName
