import React from 'react'

import Header from '@components/molecules/Header'
import SharedParient from '@components/organisms/SharedParient'

import { SharedMainContainer } from './SharedMain.styles'

const SharedMain: React.FC = () => {
    return (
        <SharedMainContainer>
            <Header />
            <SharedParient />
        </SharedMainContainer>
    )
}

export default SharedMain
