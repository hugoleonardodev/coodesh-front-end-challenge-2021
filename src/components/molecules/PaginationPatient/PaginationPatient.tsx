import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PaginationItem, PaginationLink } from 'reactstrap'

import { getSearchQuerySubmitThunk } from '@store/actions/patientsActions'
import { IRootStateWithReducers } from '@store/constants/_rootReducerTypes'

import { PatientPagination } from './PaginationPatient.styles'

const PaginationPatient: React.FC = () => {
    const dispatch = useDispatch()
    const {
        info: { page },
        search,
        filters,
    } = useSelector((state: IRootStateWithReducers) => state.patients)

    const handleNextPage = React.useCallback(() => {
        dispatch(getSearchQuerySubmitThunk(search, filters, [], page + 1))
    }, [dispatch, filters, page, search])
    const handleNextTenPages = React.useCallback(() => {
        dispatch(getSearchQuerySubmitThunk(search, filters, [], page + __MAX_NEXT_PAGES_COUNT__))
    }, [dispatch, filters, page, search])
    const handlePreviousPage = React.useCallback(() => {
        dispatch(getSearchQuerySubmitThunk(search, filters, [], page - 1))
    }, [dispatch, filters, page, search])
    const handlePreviousTenPages = React.useCallback(() => {
        dispatch(getSearchQuerySubmitThunk(search, filters, [], page - __MAX_NEXT_PAGES_COUNT__))
    }, [dispatch, filters, page, search])
    return (
        <PatientPagination aria-label="pagination" size="lg">
            <PaginationItem disabled={page < __MIN_PAGE_COUNT_TO_SKIP__} id="pagination-first">
                <PaginationLink first onClick={handlePreviousTenPages} />
            </PaginationItem>
            <PaginationItem disabled={page < __MIN_PAGE_COUNT_TO_PREVIOUS__} id="pagination-prev">
                <PaginationLink previous onClick={handlePreviousPage} />
            </PaginationItem>
            <PaginationItem disabled={true}>
                <PaginationLink id="pagination-page">{page}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink next onClick={handleNextPage} id="pagination-next" />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink last onClick={handleNextTenPages} id="pagination-last" />
            </PaginationItem>
        </PatientPagination>
    )
}

export default PaginationPatient
