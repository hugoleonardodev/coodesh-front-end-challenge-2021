// src/mocks/handlers.js
import { rest } from 'msw'

import firstTenPatients from './json/firstTenPatients'

const handlers = [
//   rest.post('/login', (req, res, ctx) => {
//     // Persist user's authentication in the session
//     sessionStorage.setItem('is-authenticated', 'true')

//     return res(
//       // Respond with a 200 status code
//       ctx.status(200),
//     )
//   }),

//   rest.get('/user', (req, res, ctx) => {
//     // Check if the user is authenticated in this session
//     const isAuthenticated = sessionStorage.getItem('is-authenticated')

//     if (!isAuthenticated) {
//       // If not authenticated, respond with a 403 error
//       return res(
//         ctx.status(403),
//         ctx.json({
//           errorMessage: 'Not authorized',
//         }),
//       )
//     }

//     // If authenticated, return a mocked user details
//     return res(
//       ctx.status(200),
//       ctx.json({
//         username: 'admin',
//       }),
//     )
//   }),

    rest.get('https://randomuser.me/api/', (req, res, ctx) => {
        // Persist user's authentication in the session
        // sessionStorage.setItem('is-authenticated', 'true')
        const query = req.url.searchParams
        console.log(query)
        const seed = query.get("seed")
        console.log(seed)
        const results = query.get("results")
        console.log(results)

        // const result = ctx.fetch('https://randomuser.me/api/?seed=PharmaInc&results=50')

        // console.log(result)

        return res(
        // Respond with a 200 status code
        ctx.status(200),
        ctx.json(results),
        )
    }),
    // rest.get('http://localhost:5010/true', (req, res, ctx) => {
    //     // Persist user's authentication in the session
    //     // sessionStorage.setItem('is-authenticated', 'true')
    //     const query = req.url
    //     console.log(query)
    //     const seed = query.get("seed")
    //     console.log(seed)
    //     const results = query.get("results")
    //     console.log(results)

    //     // const result = ctx.fetch('https://randomuser.me/api/?seed=PharmaInc&results=50')

    //     console.log(result)

    //     return res(
    //     // Respond with a 200 status code
    //     ctx.status(200),
    //     ctx.json(firstTenPatients),
    //     )
    // }),
]

export default handlers
