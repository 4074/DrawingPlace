import { SHOULD_LOGIN } from '../modules/auth'

// 请求用到的 url 统一放在这里
export const urls = {
    auth: {
        get: 'auth/get',
        signup: 'auth/signup',
        login: 'auth/login',
        logout: 'auth/logout'
    },
    place: {
        get: 'place/get'
    }
}

export default function clientMiddleware(client, socket) {
    return ({dispatch, getState}) => {
        return next => action => {
            if (typeof action === 'function') {
                return action(dispatch, getState)
            }

            const { promise, listen, types, ...rest } = action
            if (listen) {
                return listen(socket, next)
            }

            if (!promise) {
                return next(action)
            }
            
            const [REQUEST, SUCCESS, FAILURE] = types
            next({...rest, type: REQUEST})

            const actionPromise = promise(action.socket ? socket : client, urls)
            actionPromise.then(
                (result) => {
                    
                    if (result.status) {
                        next({...rest, result: result.data, response: result, type: SUCCESS})
                    } else {
                        // 401 时，前端跳转至 OpenID 登录页
                        if (result.code === 401) {
                            next({type: SHOULD_LOGIN})
                        } else if (result.code === 403) {
                            next({type: SHOULD_LOGIN, params: {url: '/403'}})
                        } else {
                            next({...rest, error: new Error(result.message), type: FAILURE})
                        }
                    }
                },
                (error) => {
                    next({...rest, error, type: FAILURE})
                }
            )

            return actionPromise
        }
    }
}