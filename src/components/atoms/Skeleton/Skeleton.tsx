import React from 'react'

import { SigleLineSkeleton, TSigleLineSkeletonProperties } from './Skeleton.styles'

const Skeleton: React.FC<TSigleLineSkeletonProperties> = ({ isLarge }) => {
    return <SigleLineSkeleton isLarge={isLarge} />
}

export default Skeleton
