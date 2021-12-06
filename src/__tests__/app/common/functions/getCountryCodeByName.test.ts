import { getCountryCodeByName } from '@common/functions'

describe('getCountryCodeByName', () => {
    it('should return the given name if the country do not exists', () => {
        const givenCode = getCountryCodeByName('Brazil')
        expect(givenCode).toBe('BR')
        const countryName = getCountryCodeByName('Narnia')
        expect(countryName).toBe('Narnia')
    })
})
