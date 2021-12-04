import React from 'react'
import { Spinner } from 'reactstrap'

import { LoadingFallbackContainer } from './LoadingFallback.styles'

const LoadingFallback: React.FC = () => {
    return (
        <LoadingFallbackContainer>
            <Spinner />
        </LoadingFallbackContainer>
    )
}

export default LoadingFallback
