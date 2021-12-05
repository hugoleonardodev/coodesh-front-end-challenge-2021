import { Button, Form } from 'reactstrap'

import styled from 'styled-components'

export const SearchFilterForm = styled(Form)`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const SubmitSearchButton = styled(Button)`
    transform: translateY(-8px);
    height: 56px;
`

export const SubmitSearchFiltersContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    @media only screen and (max-width: 769px) {
        display: none;
    }
`
