import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

type TNotFoundProperties = {
    patient?: boolean
}

import NotFoundImage from '@common/assets/404.jpg'
import { ReactComponent as WarningIcon } from '@common/assets/warning.svg'
import { IRootStateWithReducers } from '@store/constants/_rootReducerTypes'

import { NotFoundContainer } from './NotFoud.styles'

const NotFound: React.FC<TNotFoundProperties> = ({ patient }) => {
    const {
        info: { page },
    } = useSelector((state: IRootStateWithReducers) => state.patients)
    return (
        <NotFoundContainer fluid>
            {!patient ? (
                <>
                    <section>
                        <img src={NotFoundImage} alt="" />
                    </section>
                    <nav>
                        <Link to="/">Back to Home</Link>
                    </nav>
                </>
            ) : (
                <>
                    <WarningIcon height="200px" width="200px" />
                    <h5>Patient not found.</h5>
                    <p>This is the filtering result for 50 first patients on page {page}.</p>
                    <p>You may take a look on the next pages.</p>
                </>
            )}
        </NotFoundContainer>
    )
}

export default NotFound
