import React from 'react'

import { createMemoryHistory } from 'history'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithRouterAndStore } from '__tests__/helpers/renderWithStoreAndRouter'
import firstTenPatients from '__tests__/mocks/json/firstTenPatients'

import HomeMain from '@layouts/HomeMain'
import { ConfigsDataActions, TUserConfigs, TConfigsActionsCreators } from '@store/constants/configsTypes'
import { TPatientsActionsCreators } from '@store/constants/patientsTypes'
import { PatientsDataActions } from '@store/constants/patientsTypes'

export interface IFilter {
    query: string
    filter: '' | 'name' | 'nation'
}

export type TPatientsInitialState = {
    search: string
    filters: IFilter[]
} & PatientsAPI.IPatientRootObject

const mockedPatients: TPatientsInitialState = {
    search: 'brazil',
    filters: [
        { query: 'brazil', filter: 'nation' },
        { query: 'Petersen', filter: 'name' },
    ],
    results: [
        {
            gender: 'female',
            name: {
                title: 'Mrs',
                first: 'Marie',
                last: 'Petersen',
            },
            location: {
                street: {
                    number: 6940,
                    name: 'Trekanten',
                },
                city: 'Kvistgaard',
                state: 'Sjælland',
                country: 'Denmark',
                postcode: 36671,
                coordinates: {
                    latitude: '-34.5535',
                    longitude: '42.1433',
                },
                timezone: {
                    offset: '+5:00',
                    description: 'Ekaterinburg, Islamabad, Karachi, Tashkent',
                },
            },
            email: 'marie.petersen@example.com',
            login: {
                uuid: 'ac9abe6c-4c24-4576-95e8-3e8e42d080a9',
                username: 'orangeduck913',
                password: 'tucker',
                salt: 'XkqxByKx',
                md5: '1ae73e23e5ac6250dc325fbfc6519d6a',
                sha1: 'dedcd034f495efc824fe11ca391694f3c8e8bd33',
                sha256: '1f3bee9d2359a501e4cdff29ec354b49c043f9a8ea4c32aeba45e3776e6eaff9',
            },
            dob: {
                date: '1973-06-10T16:17:00.128Z',
                age: 48,
            },
            registered: {
                date: '2018-04-21T11:13:49.136Z',
                age: 3,
            },
            phone: '18050651',
            cell: '56416151',
            id: {
                name: 'CPR',
                value: '100673-6819',
            },
            picture: {
                large: 'https://randomuser.me/api/portraits/women/25.jpg',
                medium: 'https://randomuser.me/api/portraits/med/women/25.jpg',
                thumbnail: 'https://randomuser.me/api/portraits/thumb/women/25.jpg',
            },
            nat: 'DK',
        },
        {
            gender: 'female',
            name: {
                title: 'Ms',
                first: 'Ülkü',
                last: 'Akyüz',
            },
            location: {
                street: {
                    number: 1919,
                    name: 'Tunalı Hilmi Cd',
                },
                city: 'Adana',
                state: 'Bursa',
                country: 'Turkey',
                postcode: 79926,
                coordinates: {
                    latitude: '-54.1222',
                    longitude: '30.7726',
                },
                timezone: {
                    offset: '+4:00',
                    description: 'Abu Dhabi, Muscat, Baku, Tbilisi',
                },
            },
            email: 'ulku.akyuz@example.com',
            login: {
                uuid: 'a719181a-d3ee-4ee1-a93a-03c6db1afaaf',
                username: 'silversnake864',
                password: 'wildfire',
                salt: 'z1RdN0OP',
                md5: '780ae7c93d5dbacbbfe0a3f7eba0658f',
                sha1: 'c03034d191b5a856ed2160b00fb7091b2728a241',
                sha256: '9bfa344777b8de9582c137c7b90696177c096a0bd71338d317ae29fb6db78593',
            },
            dob: {
                date: '1977-05-23T14:29:29.506Z',
                age: 44,
            },
            registered: {
                date: '2007-01-13T12:42:59.789Z',
                age: 14,
            },
            phone: '(346)-062-1096',
            cell: '(185)-744-6449',
            id: {
                name: '',
                value: undefined,
            },
            picture: {
                large: 'https://randomuser.me/api/portraits/women/46.jpg',
                medium: 'https://randomuser.me/api/portraits/med/women/46.jpg',
                thumbnail: 'https://randomuser.me/api/portraits/thumb/women/46.jpg',
            },
            nat: 'TR',
        },
        {
            gender: 'female',
            name: {
                title: 'Miss',
                first: 'Naja',
                last: 'Rasmussen',
            },
            location: {
                street: {
                    number: 1135,
                    name: 'Blomstervænget',
                },
                city: 'Hornbæk',
                state: 'Syddanmark',
                country: 'Denmark',
                postcode: 70167,
                coordinates: {
                    latitude: '45.5058',
                    longitude: '112.3046',
                },
                timezone: {
                    offset: '-9:00',
                    description: 'Alaska',
                },
            },
            email: 'naja.rasmussen@example.com',
            login: {
                uuid: 'd94747a1-a420-4ea2-98b7-7a76e5bbd211',
                username: 'beautifulbear323',
                password: 'albert',
                salt: 'QCLrCTCL',
                md5: '4ef0cff6a40dead4701effe551c5f221',
                sha1: '35040e70481e294c537eda6e412f50455bed3d15',
                sha256: '4ba6952afe9cbae8c79ea8686ff0737a8e6482b62459c240ef01a9b0336d5c28',
            },
            dob: {
                date: '1975-06-17T11:54:01.895Z',
                age: 46,
            },
            registered: {
                date: '2010-06-28T22:50:34.521Z',
                age: 11,
            },
            phone: '47604054',
            cell: '24082142',
            id: {
                name: 'CPR',
                value: '170675-7191',
            },
            picture: {
                large: 'https://randomuser.me/api/portraits/women/69.jpg',
                medium: 'https://randomuser.me/api/portraits/med/women/69.jpg',
                thumbnail: 'https://randomuser.me/api/portraits/thumb/women/69.jpg',
            },
            nat: 'DK',
        },
        {
            gender: 'male',
            name: {
                title: 'Monsieur',
                first: 'Vladimir',
                last: 'Lefevre',
            },
            location: {
                street: {
                    number: 2050,
                    name: 'Rue de la Gare',
                },
                city: 'Biezwil',
                state: 'Thurgau',
                country: 'Switzerland',
                postcode: 5869,
                coordinates: {
                    latitude: '-78.1195',
                    longitude: '-70.7581',
                },
                timezone: {
                    offset: '+8:00',
                    description: 'Beijing, Perth, Singapore, Hong Kong',
                },
            },
            email: 'vladimir.lefevre@example.com',
            login: {
                uuid: 'eaa7947b-7911-4039-bb7c-a07086370d31',
                username: 'angrycat804',
                password: 'dodge',
                salt: 'TuX3CWhX',
                md5: '2266e1ef33ee0a1cea9979a3a4c90b12',
                sha1: '7aabb50cf17fa22e50ccc5543330541e1e966be6',
                sha256: 'c586d251551985f797f3e6c566a52e08777a0c16a6466c5a9e34fd616e749cbe',
            },
            dob: {
                date: '1965-06-12T07:30:12.099Z',
                age: 56,
            },
            registered: {
                date: '2010-02-20T14:22:35.901Z',
                age: 11,
            },
            phone: '077 620 29 65',
            cell: '075 622 95 14',
            id: {
                name: 'AVS',
                value: '756.1769.7690.72',
            },
            picture: {
                large: 'https://randomuser.me/api/portraits/men/63.jpg',
                medium: 'https://randomuser.me/api/portraits/med/men/63.jpg',
                thumbnail: 'https://randomuser.me/api/portraits/thumb/men/63.jpg',
            },
            nat: 'CH',
        },
        {
            gender: 'female',
            name: {
                title: 'Miss',
                first: 'Melike',
                last: 'Mayhoş',
            },
            location: {
                street: {
                    number: 6803,
                    name: 'Tunalı Hilmi Cd',
                },
                city: 'Bitlis',
                state: 'Samsun',
                country: 'Turkey',
                postcode: 51081,
                coordinates: {
                    latitude: '-13.7136',
                    longitude: '-84.1744',
                },
                timezone: {
                    offset: '-1:00',
                    description: 'Azores, Cape Verde Islands',
                },
            },
            email: 'melike.mayhos@example.com',
            login: {
                uuid: 'b2e226f8-d3a1-4b8b-9cd7-c2c402c67a87',
                username: 'bigelephant365',
                password: 'speakers',
                salt: 'KS0oudr3',
                md5: 'bed89e4886aa4f60bcb77be39dec97e9',
                sha1: '4619c9c552ad81ad0751a7879026317f6daf01bd',
                sha256: '2e31d65043e2760ae1255666d8a5b74371d860bba66d223404409640e206d62d',
            },
            dob: {
                date: '1995-12-25T05:27:55.284Z',
                age: 26,
            },
            registered: {
                date: '2007-03-25T05:25:17.337Z',
                age: 14,
            },
            phone: '(062)-135-3726',
            cell: '(010)-267-8065',
            id: {
                name: '',
                value: undefined,
            },
            picture: {
                large: 'https://randomuser.me/api/portraits/women/61.jpg',
                medium: 'https://randomuser.me/api/portraits/med/women/61.jpg',
                thumbnail: 'https://randomuser.me/api/portraits/thumb/women/61.jpg',
            },
            nat: 'TR',
        },
        {
            gender: 'male',
            name: {
                title: 'Mr',
                first: 'Samuel',
                last: 'Guerin',
            },
            location: {
                street: {
                    number: 8684,
                    name: "Place de L'Abbé-Jean-Lebeuf",
                },
                city: 'Nanterre',
                state: 'Saône-et-Loire',
                country: 'France',
                postcode: 45073,
                coordinates: {
                    latitude: '22.6164',
                    longitude: '-75.4634',
                },
                timezone: {
                    offset: '-2:00',
                    description: 'Mid-Atlantic',
                },
            },
            email: 'samuel.guerin@example.com',
            login: {
                uuid: '13fa90a4-3f92-471b-afca-e1b4e9a926aa',
                username: 'goldenpeacock659',
                password: 'shou',
                salt: 'ebtvmZZY',
                md5: '25c5855d452966d6d96d15bd577954c0',
                sha1: '931bbc4caaf5496b893e74c4a68d9f53a45e3e08',
                sha256: '538f121c473d4eae7a89cc25908a800b4718bfb29dd657f12a4409d531923ab0',
            },
            dob: {
                date: '1954-05-18T09:23:57.054Z',
                age: 67,
            },
            registered: {
                date: '2010-01-23T11:47:44.436Z',
                age: 11,
            },
            phone: '03-66-18-95-48',
            cell: '06-24-89-59-70',
            id: {
                name: 'INSEE',
                value: '1NNaN54108181 24',
            },
            picture: {
                large: 'https://randomuser.me/api/portraits/men/16.jpg',
                medium: 'https://randomuser.me/api/portraits/med/men/16.jpg',
                thumbnail: 'https://randomuser.me/api/portraits/thumb/men/16.jpg',
            },
            nat: 'FR',
        },
        {
            gender: 'male',
            name: {
                title: 'Mr',
                first: 'Samuel',
                last: 'Bryant',
            },
            location: {
                street: {
                    number: 2011,
                    name: 'The Grove',
                },
                city: 'Carlisle',
                state: 'West Sussex',
                country: 'United Kingdom',
                postcode: 'U05 4AN',
                coordinates: {
                    latitude: '-62.6681',
                    longitude: '67.0737',
                },
                timezone: {
                    offset: '-9:00',
                    description: 'Alaska',
                },
            },
            email: 'samuel.bryant@example.com',
            login: {
                uuid: '79bf3504-ed23-44f4-a1a4-2685b4a0103a',
                username: 'blackpanda727',
                password: 'females',
                salt: '4LC9p74b',
                md5: 'cf29cafd66c68a07759e1e5340cf334c',
                sha1: '6aeae228012f532470ea575ecf822e9e31b5b009',
                sha256: '3330ed897af8ba839eab5287a4eefa6af80244e8ffd7067c6b0f7b0e4046d2cf',
            },
            dob: {
                date: '1975-02-08T03:53:07.864Z',
                age: 46,
            },
            registered: {
                date: '2008-08-26T15:50:10.345Z',
                age: 13,
            },
            phone: '016977 92198',
            cell: '0716-281-398',
            id: {
                name: 'NINO',
                value: 'KK 03 71 75 G',
            },
            picture: {
                large: 'https://randomuser.me/api/portraits/men/71.jpg',
                medium: 'https://randomuser.me/api/portraits/med/men/71.jpg',
                thumbnail: 'https://randomuser.me/api/portraits/thumb/men/71.jpg',
            },
            nat: 'GB',
        },
        {
            gender: 'male',
            name: {
                title: 'Mr',
                first: 'Clifton',
                last: 'Gutierrez',
            },
            location: {
                street: {
                    number: 6111,
                    name: 'Shady Ln Dr',
                },
                city: 'Oceanside',
                state: 'North Dakota',
                country: 'United States',
                postcode: 32801,
                coordinates: {
                    latitude: '46.0313',
                    longitude: '138.5384',
                },
                timezone: {
                    offset: '+4:30',
                    description: 'Kabul',
                },
            },
            email: 'clifton.gutierrez@example.com',
            login: {
                uuid: '1a870d66-d39d-4610-953d-dcc5b92729aa',
                username: 'orangepeacock163',
                password: 'terrier',
                salt: 'BK2bzYw5',
                md5: 'caa512bc983ba748b10fbfba1a6a7c04',
                sha1: '61ae0880d6745b6d53717e693904151b307ce8a1',
                sha256: 'c68438cd70d92fbc001b115a18a3417b9e1f0c396148ffeb4210404d66490c34',
            },
            dob: {
                date: '1951-04-18T04:26:29.415Z',
                age: 70,
            },
            registered: {
                date: '2002-05-25T09:19:26.819Z',
                age: 19,
            },
            phone: '(946)-612-4524',
            cell: '(051)-260-8799',
            id: {
                name: 'SSN',
                value: '194-39-3579',
            },
            picture: {
                large: 'https://randomuser.me/api/portraits/men/63.jpg',
                medium: 'https://randomuser.me/api/portraits/med/men/63.jpg',
                thumbnail: 'https://randomuser.me/api/portraits/thumb/men/63.jpg',
            },
            nat: 'US',
        },
        {
            gender: 'female',
            name: {
                title: 'Ms',
                first: 'Apolline',
                last: 'Leclercq',
            },
            location: {
                street: {
                    number: 4907,
                    name: 'Rue Duquesne',
                },
                city: 'Versailles',
                state: 'Meurthe-et-Moselle',
                country: 'France',
                postcode: 35089,
                coordinates: {
                    latitude: '-63.5727',
                    longitude: '130.8811',
                },
                timezone: {
                    offset: '+4:00',
                    description: 'Abu Dhabi, Muscat, Baku, Tbilisi',
                },
            },
            email: 'apolline.leclercq@example.com',
            login: {
                uuid: 'e96c37ee-8fc0-4873-9d2d-14882d113e3f',
                username: 'smallleopard407',
                password: 'abcdefg',
                salt: 'DdinooSI',
                md5: 'eb406b7ec24ce53cdb56b6578c5adee1',
                sha1: 'd03f064e3cb2a03fd11398063cebc7db1ad85753',
                sha256: '5150cb508f7ce1a76536b4e30a7927e108823e9f8d128622f12124ffe1cb312f',
            },
            dob: {
                date: '1981-05-15T01:43:16.651Z',
                age: 40,
            },
            registered: {
                date: '2004-07-13T19:08:08.833Z',
                age: 17,
            },
            phone: '02-28-03-87-23',
            cell: '06-80-48-88-27',
            id: {
                name: 'INSEE',
                value: '2NNaN24142575 24',
            },
            picture: {
                large: 'https://randomuser.me/api/portraits/women/31.jpg',
                medium: 'https://randomuser.me/api/portraits/med/women/31.jpg',
                thumbnail: 'https://randomuser.me/api/portraits/thumb/women/31.jpg',
            },
            nat: 'FR',
        },
        {
            gender: 'male',
            name: {
                title: 'Mr',
                first: 'Alexis',
                last: 'Lévesque',
            },
            location: {
                street: {
                    number: 5690,
                    name: '15th St',
                },
                city: 'Oakville',
                state: 'Saskatchewan',
                country: 'Canada',
                postcode: 'B9C 2L8',
                coordinates: {
                    latitude: '49.6057',
                    longitude: '143.0734',
                },
                timezone: {
                    offset: '+6:00',
                    description: 'Almaty, Dhaka, Colombo',
                },
            },
            email: 'alexis.levesque@example.com',
            login: {
                uuid: '97f3fe05-2bb9-45bd-8365-37aa2b85a3a6',
                username: 'orangeelephant110',
                password: 'bailey',
                salt: 'UtwHekp6',
                md5: 'e0781244fd01c9c94030cabe32b9d60f',
                sha1: '3f380c280cc0ceff7ba713fe11ae499f3a45f4ce',
                sha256: 'b96d4f6c4176b58bc47cd05171046731c6a5b288794854a6ca386c395c1f586b',
            },
            dob: {
                date: '1951-02-09T03:15:28.603Z',
                age: 70,
            },
            registered: {
                date: '2018-06-20T17:30:45.900Z',
                age: 3,
            },
            phone: '949-999-9418',
            cell: '178-704-5732',
            id: {
                name: '',
                value: undefined,
            },
            picture: {
                large: 'https://randomuser.me/api/portraits/men/54.jpg',
                medium: 'https://randomuser.me/api/portraits/med/men/54.jpg',
                thumbnail: 'https://randomuser.me/api/portraits/thumb/men/54.jpg',
            },
            nat: 'CA',
        },
    ],
    info: {
        seed: 'PharmaInc',
        results: 10,
        page: 1,
        version: '1.3',
    },
}

const patientsReducer = (
    state: TPatientsInitialState = mockedPatients,
    action?: TPatientsActionsCreators,
): TPatientsInitialState => {
    if (action)
        switch (action.type) {
            case PatientsDataActions.REMOVE_SEARCH_FILTER:
                return {
                    ...state,
                    filters: [...state.filters.slice(0, action.payload), ...state.filters.slice(action.payload + 1)],
                }
            case PatientsDataActions.INITIAL_LIST_PATIENTS:
                return {
                    ...state,
                    results: [...state.results, ...action.payload.results],
                    info: {
                        seed: action.payload.info.seed,
                        results: state.info.results + action.payload.info.results,
                        page: action.payload.info.page,
                        version: action.payload.info.version,
                    },
                }
            case PatientsDataActions.PAGINATION_LOAD_PATIENTS:
                return {
                    ...state,
                    results: [...state.results, ...action.payload.results],
                    info: {
                        ...state.info,
                        results: state.info.results + action.payload.info.results,
                    },
                }
            case PatientsDataActions.SEARCH_QUERY_SUBMIT:
                return {
                    ...state,
                    search: action.payload.search,
                    filters: [...action.payload.filters],
                    results: [...action.payload.results],
                    info: {
                        results: action.payload.info.results,
                        page: action.payload.info.page,
                        seed: state.info.seed,
                        version: state.info.version,
                    },
                }

            default:
                return state
        }

    return state
}

const mockedConfigs: TUserConfigs = {
    user: 'Hugo Leonardo',
    email: 'hugoleonardo.dev@gmail.com',
    avatar: 'https://github.com/hugoleonardodev.png',
    isDarkTheme: false,
    isLoading: false,
    apiQuery: '',
}

const memoryHistory = createMemoryHistory({ initialEntries: ['/'] })

const configsReducer = (state: TUserConfigs = mockedConfigs, action?: TConfigsActionsCreators): TUserConfigs => {
    if (action)
        switch (action.type) {
            case ConfigsDataActions.SWITCH_THEME:
                return { ...state, isDarkTheme: action.payload }
            case ConfigsDataActions.SET_IS_LOADING:
                return { ...state, isLoading: action.payload }
            case ConfigsDataActions.UPDATE_API_QUERY:
                return { ...state, apiQuery: action.payload }
            default:
                return state
        }
    return state
}

const initialStates = [mockedPatients, mockedConfigs]

const userResponse = rest.get('https://randomuser.me/api/', (_request, response, context) => {
    return response(context.json(firstTenPatients))
})

const server = setupServer(
    userResponse,
    rest.get('http://localhost:5010/true&page=1&gender=female', async (_request, response, context) => {
        return response(context.json(firstTenPatients))
    }),
    rest.get('http://localhost:5010/true&page=1', async (_request, response, context) => {
        return response(context.json(firstTenPatients))
    }),
    rest.get('http://localhost:5010/true&nat=br&page=1', async (_request, response, context) => {
        return response(context.json(firstTenPatients))
    }),
)

beforeAll(() => server.listen())

afterEach(() => {
    server.resetHandlers()
    jest.resetModules()
    jest.clearAllMocks()
    cleanup()
})

afterAll(() => server.close())

const TWO_FILTERS = 2

describe('HomeMain mocked store with two filters', () => {
    it('should render two filters and be able to click first one', async () => {
        renderWithRouterAndStore(
            <HomeMain />,
            { path: '/', history: memoryHistory },
            { customConfigsReducer: configsReducer, customPatientsReducer: patientsReducer },
            initialStates,
        )

        const firstPatient = screen.getByText('Petersen, Marie')
        expect(firstPatient).toBeInTheDocument()

        const filtersButton = screen.getAllByRole('button', {
            name: /nation\/brazil/i,
        })

        expect(filtersButton.length).toBe(TWO_FILTERS)
        expect(filtersButton[1]).toBeInTheDocument()

        userEvent.click(filtersButton[1])
    })

    it('should render two filters and be able to click last one', async () => {
        renderWithRouterAndStore(
            <HomeMain />,
            { path: '/', history: memoryHistory },
            { customConfigsReducer: configsReducer, customPatientsReducer: patientsReducer },
            initialStates,
        )

        const firstPatient = screen.getByText('Petersen, Marie')
        expect(firstPatient).toBeInTheDocument()

        const filtersButton = screen.getAllByRole('button', {
            name: /name\/petersen/i,
        })

        expect(filtersButton.length).toBe(TWO_FILTERS)
        expect(filtersButton[1]).toBeInTheDocument()

        userEvent.click(filtersButton[1])
    })
})
