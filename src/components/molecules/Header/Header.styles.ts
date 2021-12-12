import { Collapse, Navbar } from 'reactstrap'

import styled from 'styled-components'

export const HeaderNavCollapse = styled(Collapse)`
    max-width: 180px;
`

export const HeaderNavBar = styled(Navbar)`
    box-shadow: 0 3px 30px rgb(0 0 0 / 10%), 0 3px 20px rgb(0 0 0 / 10%);
`

export const DropdownLink = styled.a`
    text-decoration: none;
    color: inherit;
`
