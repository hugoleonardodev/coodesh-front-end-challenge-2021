import React from 'react'
import { useSelector } from 'react-redux'
import {
    Nav,
    NavbarBrand,
    NavbarToggler,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap'

import { ReactComponent as LogoIcon } from '@common/assets/logo.svg'
import Avatar from '@components/atoms/Avatar'
import { IRootStateWithReducers } from '@store/constants/_rootReducerTypes'

import { DropdownLink, HeaderNavBar, HeaderNavCollapse } from './Header.styles'

const Header: React.FC = () => {
    const [shouldToggle, setShouldToggle] = React.useState(false)

    const handleToggle = React.useCallback(() => {
        setShouldToggle(!shouldToggle)
    }, [shouldToggle])

    const { user, avatar } = useSelector((state: IRootStateWithReducers) => state.configs)

    return (
        <HeaderNavBar color="light" expand="md" fixed="top" light>
            <NavbarBrand href="/">
                <LogoIcon /> Pharma Inc.
            </NavbarBrand>
            <NavbarToggler onClick={handleToggle} id="header-nav-bar-toggler" />
            <HeaderNavCollapse isOpen={shouldToggle} navbar>
                <Nav className="me-auto" navbar>
                    <UncontrolledDropdown inNavbar nav>
                        <DropdownToggle caret nav>
                            <Avatar avatarUrl={avatar} avatarSize="thumbnail" />
                            {'  '}
                            {user}
                        </DropdownToggle>
                        <DropdownMenu end>
                            <DropdownLink
                                href="https://github.com/hugoleonardodev/coodesh-front-end-challenge-2021/tree/hugo-leonardo-codesh-front-end-challenge-2021-react"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <DropdownItem>About</DropdownItem>
                            </DropdownLink>
                            <DropdownItem divider />
                            <DropdownLink href="/">
                                <DropdownItem>Reset</DropdownItem>
                            </DropdownLink>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            </HeaderNavCollapse>
        </HeaderNavBar>
    )
}

export default Header
