import { getCountryNameByCode } from '@common/functions'

describe('getCountryNameByCode', () => {
    it('should return the gieven code if the country do not exists', () => {
        const countryName = getCountryNameByCode('BR')
        expect(countryName).toBe('Brazil')
        const givenCode = getCountryNameByCode('12')
        expect(givenCode).toBe('12')
    })
})
