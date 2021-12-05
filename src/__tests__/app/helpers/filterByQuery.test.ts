import firstTenPatients from '__tests__/mocks/json/firstTenPatients'

import { filterByQuery } from '@store/helpers/filterByQuery'

describe('filterByQuery store helper', () => {
    it('should filter by a given name', async () => {
        const filter = filterByQuery(
            firstTenPatients,
            'brazil',
            [{ query: 'brazil', filter: 'nation' }],
            [{ query: 'santos', filter: 'name' }],
        )
        expect(filter.results).toHaveLength(5)
    })

    it('should filter by a given name', async () => {
        const filter = filterByQuery(
            firstTenPatients,
            'santos',
            [{ query: 'santos', filter: 'name' }],
            [{ query: 'brazil', filter: 'nation' }],
        )
        expect(filter.results).toHaveLength(1)
    })

    it('should filter by a given name', async () => {
        const filter = filterByQuery(firstTenPatients, 'santos', [{ query: 'santos', filter: 'name' }], [])
        expect(filter.results).toHaveLength(1)
    })

    it('should filter by a given name', async () => {
        const filter = filterByQuery(firstTenPatients, 'brazil', [{ query: 'brazil', filter: 'nation' }], [])
        expect(filter.results).toHaveLength(5)
    })

    it('should filter by a given name', async () => {
        const filter = filterByQuery(firstTenPatients, 'santos', [], [])
        expect(filter.results).toHaveLength(1)
    })
})
