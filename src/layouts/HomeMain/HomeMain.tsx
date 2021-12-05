import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useIntersectionObserver } from '@common/hooks'
import Filter from '@components/atoms/Filter'
import Header from '@components/molecules/Header'
import SearchFilter from '@components/molecules/SearchFilter'
import InfinityScroll from '@components/organisms/InfinityScroll'
import TablePatients from '@components/organisms/TablePatients'
import { getSearchQuerySubmitThunk, removeSearchFilter } from '@store/actions/patientsActions'
import { IRootStateWithReducers } from '@store/constants/_rootReducerTypes'
import { IFilter } from '@store/constants/patientsTypes'

import { HomeMainContainer, MobileSubmitSearchFilter } from './HomeMain.styles'

const HomeMain: React.FC = () => {
    const dispatch = useDispatch()
    const infinityScrollBottomReference = React.useRef<HTMLDivElement | null>(null)
    const entry = useIntersectionObserver(infinityScrollBottomReference, {})
    const isVisible = !!entry?.isIntersecting

    const { filters } = useSelector((state: IRootStateWithReducers) => state.patients)

    const handleRemoveFilter = React.useCallback(
        (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            event.preventDefault()
            if (event.currentTarget.name === 'namePill') {
                dispatch(removeSearchFilter(Number.parseInt(event.currentTarget.value, 10)))
            }
            if (event.currentTarget.name === 'nationPill') {
                dispatch(removeSearchFilter(Number.parseInt(event.currentTarget.value, 10)))
            }
            const queryFilters: IFilter[] = [
                ...filters.slice(0, Number.parseInt(event.currentTarget.value, 10)),
                ...filters.slice(Number.parseInt(event.currentTarget.value, 10) + 1),
            ]
            const lastQuery = filters.find(filter => filter.filter !== event.currentTarget.name.split('P')[0])
            dispatch(getSearchQuerySubmitThunk(lastQuery ? lastQuery.query : '', queryFilters, []))
        },
        [dispatch, filters],
    )
    return (
        <HomeMainContainer>
            <Header />
            <SearchFilter />
            <MobileSubmitSearchFilter>
                {filters.length > 0 ? (
                    filters.map(({ query, filter }, index) => (
                        <Filter
                            query={query}
                            filter={filter}
                            index={index}
                            key={`filter-${index}-${filter}`}
                            removeFilter={handleRemoveFilter}
                        />
                    ))
                ) : (
                    <div>No filters applied</div>
                )}
            </MobileSubmitSearchFilter>
            <TablePatients />
            <InfinityScroll isBottomVisible={isVisible} />
            <div ref={infinityScrollBottomReference} />
        </HomeMainContainer>
    )
}

export default HomeMain
