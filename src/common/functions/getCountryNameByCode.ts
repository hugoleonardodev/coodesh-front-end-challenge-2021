import nationalities from '../json/nationalities.json'

const getCountryNameByCode = (countryCode: string): string => {
    const countryName = nationalities.find(({ code }) => code === countryCode)
    if (countryName) return countryName.name
    return countryCode
}

export default getCountryNameByCode
