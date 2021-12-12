import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { cleanup } from '__tests__/helpers/testUtils'
import firstTenPatients from '__tests__/mocks/json/firstTenPatients'

import { getPatientsByPage } from '@services/api'

const userResponse = rest.get('https://randomuser.me/api/', (_request, response, context) => {
    return response(context.json(firstTenPatients))
})

const server = setupServer(
    userResponse,
    rest.get('http://localhost:5010/true&page=2', async (_request, response, context) => {
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

describe('getPatientsByPage response', () => {
    it('should return a list of patients', async () => {
        const PAGE_NUMBER_TWO = 2
        const patientsList = await getPatientsByPage(PAGE_NUMBER_TWO)
        expect(patientsList.data).toBeTruthy()
    })
})
