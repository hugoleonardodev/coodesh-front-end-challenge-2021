export const sortByAscendent = (patientA: PatientsAPI.IPatientData, patientB: PatientsAPI.IPatientData): -1 | 0 | 1 => {
    const nameA = patientA.name.last.toUpperCase() // ignore upper and lowercase
    const nameB = patientB.name.last.toUpperCase() // ignore upper and lowercase

    if (nameA < nameB) {
        return -1
    }

    return 1
}
export const sortByDescendent = (
    patientA: PatientsAPI.IPatientData,
    patientB: PatientsAPI.IPatientData,
): -1 | 0 | 1 => {
    const nameA = patientA.name.last.toUpperCase() // ignore upper and lowercase
    const nameB = patientB.name.last.toUpperCase() // ignore upper and lowercase

    if (nameA < nameB) {
        return 1
    }

    return -1
}
const selectSortOrder = (
    shouldSort: boolean,
    setShouldSort: React.Dispatch<React.SetStateAction<boolean>>,
    isAscendent: boolean,
    results: PatientsAPI.IPatientData[],
): PatientsAPI.IPatientData[] => {
    if (!shouldSort) setShouldSort(!shouldSort)
    if (isAscendent) {
        return results.sort(sortByAscendent)
    }
    return results.sort(sortByDescendent)
}

export default selectSortOrder
