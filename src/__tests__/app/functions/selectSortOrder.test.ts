import firstTenPatients from '__tests__/mocks/json/firstTenPatients'
import React from 'react'

import { selectSortOrder } from '@common/functions'

describe('getCountryNameByCode', () => {
    it('should return the gieven code if the country do not exists', () => {
        const setShouldSort: React.Dispatch<React.SetStateAction<boolean>> = () => true
        const sortAscendent = selectSortOrder(true, setShouldSort, true, firstTenPatients.results)
        expect(sortAscendent).toHaveLength(50)
        expect(sortAscendent[0].name.last).toBe('Akyüz')
        const sortDescendent = selectSortOrder(true, setShouldSort, false, firstTenPatients.results)
        expect(sortDescendent).toHaveLength(50)
        expect(sortAscendent[0].name.last).toBe('سلطانی نژاد')
        const shouldNotSort = selectSortOrder(false, setShouldSort, false, firstTenPatients.results)
        expect(shouldNotSort).toHaveLength(50)
        expect(sortAscendent[0].name.last).toBe('سلطانی نژاد')
    })
})
