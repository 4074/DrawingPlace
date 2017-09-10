import superagent from 'superagent'

const methods = ['get', 'post', 'put', 'patch', 'del']

function formatUrl(path) {
    const adjustedPath = path[0] !== '/' ? '/' + path : path

    return '/api' + adjustedPath
}

export default class ApiClient {
    constructor(req) {
        methods.forEach((method) =>
            this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
                const request = superagent[method](formatUrl(path))

                // 取用户信息，传入默认信息
                let { user } = window.__store
                user = user || {}
                const defaultData = {
                    userid: user.id,
                    username: user.username,
                    // redirect: window.location.hrefß
                }

                // 有 params 时 query defaultData
                // 有 data 时 send defaultData
                // 都没有时 query defaultData
                if (params || !data) {
                    request.query(Object.assign(defaultData, params))
                }

                if (data) {
                    request.send(Object.assign(defaultData, data))
                }

                request.set('Accept', 'application/json')
                request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body))
            })
        )
    }

    empty() {}
}

export function upload(url, files = []) {
    new Promise((resolve, reject) => {
        const request = superagent.post(formatUrl(url))
        // request.set('Accept', 'application/json')
        request.withCredentials()

        for (const item of files) {
            console.log(item)
            request.attach(item.name, item.file)
        }
        request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body))
    })
}