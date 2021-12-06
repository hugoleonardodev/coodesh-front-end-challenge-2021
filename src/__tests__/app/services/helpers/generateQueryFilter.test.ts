import generateQueryFilter from '@services/helpers/generateQueryFilter'

describe('generateQueryFilter', () => {
    it('should return empty string when no filters are given', () => {
        const result = generateQueryFilter([], [{ query: 'brazil', filter: 'nation' }])
        expect(result).toBe('&nat=br')
    })
})
