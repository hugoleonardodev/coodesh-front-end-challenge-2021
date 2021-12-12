import { CardTitle } from 'reactstrap'

import styled from 'styled-components'

export const SharedPatientButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .btn.btn-success,
    .btn.btn-secondary {
        svg {
            transform: translateY(-2px);
        }
    }
`

export const SharedPatientCardTitle = styled(CardTitle)`
    display: flex;
    flex-direction: column;
    align-items: center;
    svg {
        fill: #6c757d;
        height: 200px;
        width: 200px;
    }
`
