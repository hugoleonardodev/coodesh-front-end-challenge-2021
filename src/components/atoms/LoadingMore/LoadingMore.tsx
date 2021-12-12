import React from 'react'
import { Spinner } from 'reactstrap'

import { LoadingMoreContainer } from './LoadingMore.styles'

const LoadingMore: React.FC = () => {
    return (
        <LoadingMoreContainer>
            <Spinner />
            <p>Keep scolling down for loading more...</p>
        </LoadingMoreContainer>
    )
}

export default LoadingMore
