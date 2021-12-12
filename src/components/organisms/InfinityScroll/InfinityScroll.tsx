import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import LoadingMore from '@components/atoms/LoadingMore'
import Footer from '@components/molecules/Footer'
import { getPatientsByPageThunk } from '@store/actions/patientsActions'
import { IRootStateWithReducers } from '@store/constants/_rootReducerTypes'

type TInfinityScrollProperties = {
    isBottomVisible: boolean
    hasNext?: boolean
}

const InfinityScroll: React.FC<TInfinityScrollProperties> = ({ isBottomVisible }) => {
    const dispatch = useDispatch()
    const { isLoading } = useSelector((state: IRootStateWithReducers) => state.configs)
    const {
        info: { page },
        results,
    } = useSelector((state: IRootStateWithReducers) => state.patients)

    React.useEffect(() => {
        const MAX_API_RESPONSE_RESULTS = 50
        if (!isLoading && isBottomVisible && results.length >= MAX_API_RESPONSE_RESULTS) {
            dispatch(getPatientsByPageThunk(page + 1))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isBottomVisible])

    return <>{!isBottomVisible && results.length > 0 ? <LoadingMore /> : <Footer />}</>
}

export default InfinityScroll
