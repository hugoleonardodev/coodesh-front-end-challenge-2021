/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />
/// <reference types="redux" />
/// <reference types="react-redux" />
/// <reference types="react-router-dom" />
/// <reference types="webpack" />
/// <reference types="webpack-dev-server" />
/// <reference types="styled-components" />

declare const __IS_DEVELOPMENT__: boolean
declare const __IS_PRODUCTION__: boolean
declare const __APP_NAME__: string
declare const __APP_BASE_URL__: string

/**
 * @baseUrl https://randomuser.me/api
 * @see https://randomuser.me/api
 */
declare const __API_BASE_URL__: string

declare const __MAX_FILTERS_LENGTH__ = 2

declare const __MIN_PAGE_COUNT_TO_SKIP__ = 11
declare const __MIN_PAGE_COUNT_TO_PREVIOUS__ = 2
declare const __MAX_NEXT_PAGES_COUNT__ = 10

declare const __ONE_SECOND__ = 1000

declare const __200_OK__ = 200
declare const __400_BAD_REQUEST__ = 400
declare const __404_NOT_FOUND__ = 404
