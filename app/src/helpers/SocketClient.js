import io from 'socket.io-client'

export default class SocketClient {
    constructor() {
        this.chat = io('http://localhost:5200/socket/chat')
        this.draw = io('http://localhost:5200/socket/draw')

        console.log('connecting')
        this.chat.on('connect', () => {
            console.log('connected')
        })
    }

    emit(channel, event, params) {
        return new Promise((resolve, reject) => {
            channel.emit(event, {
                user: window.__store.user,
                ...params
            }, result => {
                resolve(result)
            })
        })
    }
}