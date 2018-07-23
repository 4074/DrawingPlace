import { User } from '../models'

export function login(params) {
    return User.find({username: params.username}).then(data => {
        if (data.length === 0) {
            throw new Error('用户不存在')
        }
        const user = data[0]

        if (user.authenticate(params.password)) {
            const info = user.getDefaultInfo()
            return info
        } else {
            throw new Error('登录失败')
        }
    })
}

export function signup(params) {
    return User.create({
        username: params.username,
        email: '',
        password_origin: params.password
    })
}