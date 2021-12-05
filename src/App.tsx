import React from 'react'
import { Provider as ReduxStoreProvider } from 'react-redux'

import { ConnectedRouter } from 'connected-react-router'
import styled, { ThemeProvider } from 'styled-components'

import goodContrastTheme from '@common/themes/goodContrastTheme'

import Routes from './Routes'
import store, { history } from './store'

import './App.scss'

const App: React.FC = () => {
    return (
        <ReduxStoreProvider store={store}>
            <AppProviders>
                <Routes />
            </AppProviders>
        </ReduxStoreProvider>
    )
}

export default App

export const RootThemeWrapper = styled.div`
    background: ${({ theme }) => theme.colors.background.light};
    color: ${({ theme }) => theme.colors.text.light};
`

export const AppProviders: React.FC = ({ children }) => {
    // const { switchTheme } = useSelector((state: RootStateWithReducers) => state.teachers)
    return (
        <ThemeProvider theme={goodContrastTheme}>
            <ConnectedRouter history={history}>
                <RootThemeWrapper>{children}</RootThemeWrapper>
            </ConnectedRouter>
        </ThemeProvider>
    )
}
