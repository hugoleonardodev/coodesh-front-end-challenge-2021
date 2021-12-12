import { Action, createStore, Reducer } from 'redux'

import { TUserConfigs, ConfigsDataActions } from '@store/constants/configsTypes'
import configsReducer from '@store/reducers/configsReducer'

const initialState: TUserConfigs = {
    user: 'Hugo Leonardo',
    email: 'hugoleonardo.dev@gmail.com',
    avatar: 'https://github.com/hugoleonardodev.png',
    isDarkTheme: false,
    isLoading: true,
    apiQuery: '',
}

const reducer = configsReducer as Reducer<TUserConfigs, Action<unknown>>

const configsStore = createStore(reducer)

describe('Configs Reducer', () => {
    it('should change loading state', () => {
        expect(
            reducer(
                initialState,
                configsStore.dispatch({
                    type: ConfigsDataActions.SET_IS_LOADING,
                    payload: false,
                }),
            ),
        ).toEqual({
            ...initialState,
            isLoading: false,
        })
    })

    it('should change theme state', () => {
        expect(
            reducer(
                initialState,
                configsStore.dispatch({
                    type: ConfigsDataActions.SWITCH_THEME,
                    payload: true,
                }),
            ),
        ).toEqual({
            ...initialState,
            isDarkTheme: true,
        })
    })

    it('should change api query', () => {
        expect(
            reducer(
                initialState,
                configsStore.dispatch({
                    type: ConfigsDataActions.UPDATE_API_QUERY,
                    payload: '/api',
                }),
            ),
        ).toEqual({
            ...initialState,
            apiQuery: '/api',
        })
    })

    it('should change api query', () => {
        expect(
            reducer(
                initialState,
                configsStore.dispatch({
                    type: null,
                }),
            ),
        ).toEqual({
            ...initialState,
        })
    })
})
