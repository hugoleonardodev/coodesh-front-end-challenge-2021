import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useRouteMatch } from 'react-router'
import {
    Button,
    Card,
    CardBody,
    CardGroup,
    CardImg,
    CardSubtitle,
    CardText,
    CardTitle,
    UncontrolledTooltip,
} from 'reactstrap'

import { ReactComponent as BackIcon } from '@common/assets/back.svg'
import { ReactComponent as CopyIcon } from '@common/assets/copy.svg'
import { ReactComponent as LocationIcon } from '@common/assets/location.svg'
import { ReactComponent as ProfileIcon } from '@common/assets/profile.svg'
import { ReactComponent as ShareBigIcon } from '@common/assets/share_big.svg'
import { getCountryNameByCode, getUsDateFormat } from '@common/functions'
import { useCopyToClipboard } from '@common/hooks'
import { IRootStateWithReducers } from '@store/constants/_rootReducerTypes'

import { SharedPatientButtonsContainer, SharedPatientCardTitle } from './SharedPatient.styles'

type TSharedPatient = {
    patientId?: string
}

const SharePatient: React.FC<TSharedPatient> = () => {
    const { results } = useSelector((state: IRootStateWithReducers) => state.patients)
    const { url } = useRouteMatch()
    const history = useHistory()
    const [copiedText, setCopiedText] = useCopyToClipboard()
    const patientById = results.find(patient => patient.login.uuid === url.split('/')[2])
    const handleCopyToClipboard = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setCopiedText(event.currentTarget.value)
    }
    const handleGoBack = () => {
        history.goBack()
    }
    if (patientById) {
        return (
            <CardGroup>
                <Card>
                    <CardImg alt={patientById.picture.large} src={patientById.picture.large} top width="100%" />
                    <CardBody>
                        <CardTitle tag="h5">{`${patientById.name.title} ${patientById.name.first} ${patientById.name.last}`}</CardTitle>
                        <CardSubtitle className="mb-2 text-muted" tag="h6">
                            {patientById.gender}
                        </CardSubtitle>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <SharedPatientCardTitle tag="h5">
                            <ProfileIcon /> <p>Profile</p>
                        </SharedPatientCardTitle>
                        <CardSubtitle className="mb-2 text-muted" tag="h6">
                            <strong>ID:</strong> {patientById.login.uuid}
                        </CardSubtitle>
                        <CardText>
                            <strong>Date of Birth:</strong> {getUsDateFormat(patientById.dob.date)}
                        </CardText>
                        <CardText>
                            <strong>Nationality:</strong>{' '}
                            {`${getCountryNameByCode(patientById.nat)}, ${patientById.nat}`}
                        </CardText>
                        <CardText>
                            <strong>E-mail:{'  '}</strong>
                            {patientById.email}
                        </CardText>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <SharedPatientCardTitle tag="h5">
                            <LocationIcon /> <p>Location</p>
                        </SharedPatientCardTitle>
                        <CardSubtitle className="mb-2 text-muted" tag="h6">
                            <strong>Address:</strong>{' '}
                            {`${patientById.location.street.name}, ${patientById.location.street.number}, ${patientById.location.city}, ${patientById.location.state}`}
                        </CardSubtitle>
                        <SharedPatientButtonsContainer>
                            <CardText>
                                <strong>Post Code:</strong> {patientById.location.postcode}
                            </CardText>
                            <CardText>
                                <strong>Country:{'  '}</strong> {patientById.location.country}
                            </CardText>
                        </SharedPatientButtonsContainer>
                        <SharedPatientButtonsContainer>
                            <CardText>
                                <strong>Time Zone:{'  '}</strong> {patientById.location.timezone.offset}
                            </CardText>
                            <CardText>
                                <strong>Phone:{'  '}</strong>
                                {patientById.phone}
                            </CardText>
                        </SharedPatientButtonsContainer>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <SharedPatientCardTitle tag="h5">
                            <ShareBigIcon /> <p>Share this patient link:</p>
                        </SharedPatientCardTitle>
                        <CardSubtitle className="mb-2 text-muted" tag="h6">
                            {`${__APP_BASE_URL__}/patient/${patientById.login.uuid}`}
                        </CardSubtitle>
                        <CardText>Copy to clipboard:</CardText>
                        <SharedPatientButtonsContainer>
                            <Button
                                onClick={handleCopyToClipboard}
                                value={`${__APP_BASE_URL__}/patient/${patientById.login.uuid}`}
                                disabled={!!copiedText}
                                color="success"
                                id="copy-to-clipboard"
                            >
                                <CopyIcon /> Copy
                            </Button>
                            <UncontrolledTooltip placement="right" target="copy-to-clipboard" trigger="click">
                                {copiedText ? 'Copied succesfully.' : 'Something went wrong.'}
                            </UncontrolledTooltip>
                            <Button onClick={handleGoBack} id="back-to-list">
                                <BackIcon /> Back
                            </Button>
                        </SharedPatientButtonsContainer>
                    </CardBody>
                </Card>
            </CardGroup>
        )
    }
    return <div>Patient not found</div>
}

export default SharePatient
