import React from 'react'

import { AvatarImage } from './Avatar.styles'

type TAvatarProperties = React.HTMLProps<HTMLImageElement> & {
    avatarUrl: string
    avatarSize: 'large' | 'medium' | 'thumbnail'
}

const getAvatarSize = (avatarSize: 'large' | 'medium' | 'thumbnail') => {
    if (avatarSize === 'thumbnail') {
        return '48px'
    }
    if (avatarSize === 'medium') {
        return '72px'
    }
    return '128px'
}

const Avatar: React.FC<TAvatarProperties> = ({ avatarUrl, avatarSize }) => {
    return (
        <AvatarImage
            src={avatarUrl}
            alt={avatarUrl}
            height={getAvatarSize(avatarSize)}
            width={getAvatarSize(avatarSize)}
        />
    )
}

export default React.memo(Avatar)
