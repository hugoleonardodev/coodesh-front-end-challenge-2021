import { rest } from 'msw'

import firstTenPatients from '../json/firstTenPatients'

const handlers = [
    rest.get('https://randomuser.me/api/', (_request, response, context) => {
        return response(context.json(firstTenPatients))
    }),
    rest.get('http://localhost:5010/true', async (_request, response, context) => {
        return response(context.json(firstTenPatients))
    }),
    rest.get('http://localhost:5010/true&page=1', async (_request, response, context) => {
        return response(context.json(firstTenPatients))
    }),
    rest.get('http://localhost:5010/true&nat=br&page=1', async (_request, response, context) => {
        return response(context.json(firstTenPatients))
    }),
]

export default handlers
