import { renderWithRouterAndStore } from '__tests__/helpers/renderWithStoreAndRouter'
import React from 'react'

import Avatar from '@components/atoms/Avatar'
import { screen, cleanup } from '@testing-library/react'

afterEach(() => {
    // server.resetHandlers()
    jest.resetModules()
    jest.clearAllMocks()
    cleanup()
})

describe('Renders HomePage to test NotFound behavior', () => {
    it('should render a text when a patient is not found', async () => {
        renderWithRouterAndStore(<Avatar avatarUrl="https://github.com/hugoleonardodev.png" avatarSize="medium" />)

        const imageAvatar = screen.getByRole('img', {
            name: 'https://github.com/hugoleonardodev.png',
        })
        expect(imageAvatar).toBeInTheDocument()
    })

    it('should render an image and a link when page is not found', async () => {
        renderWithRouterAndStore(<Avatar avatarUrl="https://github.com/hugoleonardodev.png" avatarSize="large" />)

        const imageAvatar = screen.getByRole('img', {
            name: 'https://github.com/hugoleonardodev.png',
        })
        expect(imageAvatar).toBeInTheDocument()
    })
})
