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
            if (window.location.pathname !== '/login') {
                history.pushState({}, '', '/login')
            }
            return {
                ...state,
                user: null
            }
        case LOGIN:
            return state
        case LOGIN_SUCCESS:
            window.__store.user = action.result
            if (window.location.pathname === '/login') {
                history.pushState({}, '', '/')
            }
            return {
                ...state,
                user: action.result
            }
        case LOGIN_FAIL:
            return state
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