import React from 'react'
import { useSelector } from 'react-redux'

type TNotFoundProperties = {
    patient?: boolean
}

import NotFoundImage from '@common/assets/404.jpg'
import { ReactComponent as WarningIcon } from '@common/assets/warning.svg'
import { IRootStateWithReducers } from '@store/constants/_rootReducerTypes'

const NotFound: React.FC<TNotFoundProperties> = ({ patient }) => {
    const {
        info: { page },
    } = useSelector((state: IRootStateWithReducers) => state.patients)
    return (
        <>
            {!patient ? (
                <img src={NotFoundImage} alt="" />
            ) : (
                <>
                    <WarningIcon height="200px" width="200px" />
                    <h5>Patient not found.</h5>
                    <p>This is the filtering result for 50 first patients on page {page}.</p>
                    <p>You may take a look on the next pages.</p>
                </>
            )}
        </>
    )
}

export default NotFound
