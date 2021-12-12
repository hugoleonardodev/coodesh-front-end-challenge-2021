import styled from 'styled-components'

export const HomeMainContainer = styled.main`
    margin-top: 100px;
    padding: 0 200px;
    @media only screen and (max-width: 769px) {
        padding: 0;
    }
`
export const MobileSubmitSearchFilter = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    @media only screen and (min-width: 769px) {
        display: none;
    }
`
