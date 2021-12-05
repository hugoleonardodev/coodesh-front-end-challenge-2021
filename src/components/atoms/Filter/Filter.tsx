import React from 'react'
import { UncontrolledTooltip } from 'reactstrap'

import { IFilter } from '@store/constants/patientsTypes'

import { FilterPills } from './Filter.styles'

type TFilterProperties = {
    index: number
    removeFilter: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
} & IFilter

const Filter: React.FC<TFilterProperties> = ({ query, filter, index, removeFilter }) => {
    return (
        <>
            <FilterPills id={`${filter}Pill`} name={`${filter}Pill`} value={index} onClick={removeFilter}>
                {`${filter}/${query}`}
            </FilterPills>
            <UncontrolledTooltip placement="top" target={`${filter}Pill`} trigger="hover">
                Click to remove
            </UncontrolledTooltip>
        </>
    )
}

export default Filter
