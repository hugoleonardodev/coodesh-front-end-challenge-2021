declare namespace PatientsAPI {
    export interface IPatientName {
        title: string
        first: string
        last: string
    }

    export interface IPatientStreet {
        number: number
        name: string
    }

    export interface IPatientCoordinates {
        latitude: string
        longitude: string
    }

    export interface IPatientTimezone {
        offset: string
        description: string
    }

    export interface IPatientLocation {
        street: IPatientStreet
        city: string
        state: string
        country: string
        postcode: string | number
        coordinates: IPatientCoordinates
        timezone: IPatientTimezone
    }

    export interface IPatientLogin {
        uuid: string
        username: string
        password: string
        salt: string
        md5: string
        sha1: string
        sha256: string
    }

    export interface IPatientDayOfBirth {
        date: Date | string
        age: number
    }

    export interface IPatientRegistered {
        date: Date | string
        age: number
    }

    export interface IPatientId {
        name: string
        value?: string | null
    }

    export interface IPatientPicture {
        large: string
        medium: string
        thumbnail: string
    }

    export interface IPatientData {
        gender: string
        name: IPatientName
        location: IPatientLocation
        email: string
        login: IPatientLogin
        dob: IPatientDayOfBirth
        registered: IPatientRegistered
        phone: string
        cell: string
        id: IPatientId
        picture: IPatientPicture
        nat: string
    }

    export interface IPatientResultsInfo {
        seed: string
        results: number
        page: number
        version: string
    }

    export interface IPatientRootObject {
        results: IPatientData[]
        info: IPatientResultsInfo
    }
}
