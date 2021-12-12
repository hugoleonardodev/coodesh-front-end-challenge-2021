import styled from 'styled-components'

export const TableRow = styled.tr`
    svg {
        transform: translateY(-2px);
    }
    &:hover {
        background-color: #e9ecef;
    }
    @media only screen and (max-width: 769px) {
        span {
            display: none;
        }
    }
`

export const NameTh = styled.th`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    svg {
        cursor: pointer;
        height: 20px;
        width: 20px;
        fill: #212529;
    }
`
