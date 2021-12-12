import { ConfigsDataActions, ISetIsLoading, ISwitchThemeAction, IUpdateApiQuery } from '@store/constants/configsTypes'

/**
 * An action to set a list with the first 50 patients from the random user API.
 * @param shouldThemeSwitch
 * @default false
 * @returns return an action creator with `type` and `payload`
 * @example
 * import { dispatch } from 'redux'
 * import { useSelector } from 'react-redux'
 *
 * const { isDarkTheme } = useSelector((state: State) => state)
 *
 * switchTheme(!isDarkTheme) =>
 * ({
 *   type: ConfigsDataActions.SWITCH_THEME,
 *   payload: !isDarkTheme,
 * })
 */
export const switchTheme = (shouldThemeSwitch: boolean): ISwitchThemeAction => ({
    type: ConfigsDataActions.SWITCH_THEME,
    payload: shouldThemeSwitch,
})

/**
 * An action to trigger loading when waiting for API responses.
 * @param isLoading
 * @default true
 * @returns return an action creator with `type` and `payload`
 * @example
 * import { dispatch } from 'redux'
 * import { useSelector } from 'react-redux'
 *
 * const { isLoading } = useSelector((state: State) => state)
 *
 * setIsLoading(!isLoading) =>
 * ({
 *   type: ConfigsDataActions.SET_IS_LOADING,
 *   payload: !isLoading,
 * })
 */
export const setIsLoading = (isLoading: boolean): ISetIsLoading => ({
    type: ConfigsDataActions.SET_IS_LOADING,
    payload: isLoading,
})

/**
 * An action to trigger loading when waiting for API responses.
 * @param apiQuery
 * @default ''
 * @returns return an action creator with `type` and `payload`
 * @example
 * import { dispatch } from 'redux'
 * import { useSelector } from 'react-redux'
 *
 * const { apiQuery } = useSelector((state: State) => state)
 *
 * updateApiQuery('https://randomuser.me/api/?seed=PharmaInc&results=50') =>
 * ({
 *   type: ConfigsDataActions.UPDATE_API_QUERY,
 *   payload: 'https://randomuser.me/api/?seed=PharmaInc&results=50',
 * })
 */
export const updateApiQuery = (apiQuery: string): IUpdateApiQuery => ({
    type: ConfigsDataActions.UPDATE_API_QUERY,
    payload: apiQuery,
})
