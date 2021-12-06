import React from 'react'
import { useHistory } from 'react-router'
import { Button, ModalBody } from 'reactstrap'

import { ReactComponent as CloseIcon } from '@common/assets/close.svg'
import { ReactComponent as ShareIcon } from '@common/assets/share.svg'
import { getCountryNameByCode, getUsDateFormat } from '@common/functions'
import Avatar from '@components/atoms/Avatar'

import {
    ModalPatientContainer,
    PatientModal,
    PatientModalFooter,
    PatientModalHeader,
    PatientModalRow,
} from './ModalPatient.styles'

export type TModalPatientProperties = {
    patient: PatientsAPI.IPatientData
}

const ModalPatient: React.FC<TModalPatientProperties> = ({ children, patient }) => {
    const [shouldModalOpen, setShouldModalOpen] = React.useState(false)

    const toggleModal = React.useCallback(() => {
        setShouldModalOpen(!shouldModalOpen)
    }, [shouldModalOpen])

    const history = useHistory()

    const handleSharePatient = React.useCallback(() => {
        history.push(`/patient/${patient.login.uuid}`)
    }, [history, patient.login.uuid])

    return (
        <ModalPatientContainer>
            <Button color="primary" onClick={toggleModal} id={`patient-id-${patient.login.uuid}`}>
                {children}
            </Button>
            <PatientModal isOpen={shouldModalOpen} toggle={toggleModal} id="modal-patient-portal">
                <Avatar avatarUrl={patient.picture.large} avatarSize="large" />
                <PatientModalHeader>
                    <div>
                        <span>{`${patient.name.first} ${patient.name.last}`}</span>
                        <span>{patient.gender}</span>
                    </div>
                </PatientModalHeader>
                <ModalBody>
                    <p>
                        <strong>ID:{'  '}</strong>
                        {patient.login.uuid}
                    </p>

                    <p>
                        <strong>E-mail:{'  '}</strong> {patient.email}
                    </p>
                    <PatientModalRow>
                        <p>
                            <strong>Date of Birth:{'  '}</strong> {getUsDateFormat(patient.dob.date)}
                        </p>
                        <p>
                            <strong>Nationality:{'  '}</strong> {`${getCountryNameByCode(patient.nat)}, ${patient.nat}`}
                        </p>
                    </PatientModalRow>
                    <p>
                        <strong>Address:{'  '}</strong>
                        {`${patient.location.street.name}, ${patient.location.street.number}, ${patient.location.city}, ${patient.location.country}`}
                    </p>
                    <p>
                        <strong>Phone:{'  '}</strong> {patient.phone}
                    </p>
                </ModalBody>
                <PatientModalFooter>
                    <Button onClick={handleSharePatient} color="success" id="modal-share-button">
                        <ShareIcon /> Share
                    </Button>
                    <Button onClick={toggleModal} id="modal-close-button">
                        <CloseIcon /> Close
                    </Button>
                </PatientModalFooter>
            </PatientModal>
        </ModalPatientContainer>
    )
}

export default ModalPatient
