export const SHOULD_LOGIN = 'auth/SHOULD_LOGIN'

const LOGIN = 'auth/LOGIN'
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS'
const LOGIN_FAIL= 'auth/LOGIN_FAIL'

const LOGOUT = 'auth/LOGOUT'
const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS'
const LOGOUT_FAIL = 'auth/LOGOUT_FAIL'

const LOAD = 'auth/load'
const LOAD_SUCCESS = 'auth/LOAD_SUCCESS'
const LOAD_FAIL = 'auth/LOAD_FAIL'

const TOGGLE_LOGIN = 'auth/TOGGLE_LOGIN'

const SIGNUP = 'auth/SIGNUP'
const SIGNUP_SUCCESS = 'auth/SIGNUP_SUCCESS'
const SIGNUP_FAIL = 'auth/SIGNUP_FAIL'

const initialState = {
    
}

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case LOAD_SUCCESS:
            window.__store.user = action.result
            return {
                ...state,
                user: action.result
            }
        case SHOULD_LOGIN:
            window.location.reload(true)
            // if (window.location.pathname !== '/login') {
            //     history.pushState({}, '', '/login')
            // }
            // return {
            //     ...state,
            //     user: null
            // }
        case LOGIN:
            return {
                ...state,
                logining: true
            }
        case LOGIN_SUCCESS:
            // window.__store.user = action.result
            // if (window.location.pathname === '/login') {
            //     history.pushState({}, '', '/')
            // }
            // return {
            //     ...state,
            //     user: action.result,
            //     logining: false,
            //     logined: true
            // }
            console.log('LOGIN_SUCCESS')
            window.location.reload(true)
        case LOGIN_FAIL:
            return {
                ...state,
                logining: false,
                logined: false,
                login_error: action.error
            }

        case TOGGLE_LOGIN:
            return {
                ...state,
                loginVisible: !!action.params.visible
            }

        case SIGNUP:
            return {
                ...state,
                signuping: true
            }
        case SIGNUP_SUCCESS:
            // return {
            //     ...state,
            //     signuping: false,
            //     signuped: true
            // }
            window.location.reload(true)
        case SIGNUP_FAIL:
            return {
                ...state,
                signuping: false,
                signuped: false,
                signup_error: action.error
            }

        default:
            return state
    }
}

export function redirect(params) {
    return {
        type: REDIRECT,
        params
    }
}

export function signup(params) {
    return {
        types: [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL],
        promise: (client, urls) => client.post(urls.auth.signup, {
            data: {
                data: {
                    ...params
                }
            }
        })
    }
}

export function login(params) {
    console.log(params)
    return {
        types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
        promise: (client, urls) => client.post(urls.auth.login, {
            data: {
                data: {
                    ...params
                }
            }
        })
    }
}

export function logout(params) {
    return {
        types: [LOGOUT, SHOULD_LOGIN, LOGOUT_FAIL],
        promise: (client, urls) => client.post(urls.auth.logout)
    }
}

export function isLoaded(state) {
    return state.auth.user
}

export function load() {
    return {
        types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
        promise: (client, urls) => client.get(urls.auth.get)
    }
}

export function toggleLogin(visible) {
    return {
        type: TOGGLE_LOGIN,
        params: { visible }
    }
}