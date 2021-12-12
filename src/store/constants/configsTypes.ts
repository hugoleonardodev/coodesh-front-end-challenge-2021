export type TUserConfigs = {
    user: string
    email: string
    avatar: string
    isDarkTheme: boolean
    isLoading: boolean
    apiQuery: string
}

/**
 * User's configs data store actions.
 * @SWITCH_THEME switch theme from `light` to `dark` and vice-versa.
 * @SET_IS_LOADING set isLoadig `true` when is needed and and vice-versa.
 * @UPDATE_API_QUERY set isLoadig `true` when is needed and and vice-versa.
 */
export enum ConfigsDataActions {
    SWITCH_THEME = 'SWITCH_THEME',
    SET_IS_LOADING = 'SET_IS_LOADING',
    UPDATE_API_QUERY = 'UPDATE_API_QUERY',
}

export interface ISwitchThemeAction {
    type: ConfigsDataActions.SWITCH_THEME
    payload: boolean
}

export interface ISetIsLoading {
    type: ConfigsDataActions.SET_IS_LOADING
    payload: boolean
}

export interface IUpdateApiQuery {
    type: ConfigsDataActions.UPDATE_API_QUERY
    payload: string
}

/**
 * A union type with all the actions creators for user's configs.
 * In order to pass more than one action to `reducer`, we must group it with one alias.
 */
export type TConfigsActionsCreators = ISwitchThemeAction | ISetIsLoading | IUpdateApiQuery
