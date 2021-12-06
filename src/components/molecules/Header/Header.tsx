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

import { HeaderNavBar, HeaderNavCollapse } from './Header.styles'

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
                            <DropdownItem>About</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>Reset</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            </HeaderNavCollapse>
        </HeaderNavBar>
    )
}

export default Header
