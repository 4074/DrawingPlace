import io from 'socket.io-client'

export default class SocketClient {
    constructor() {
        this.chat = io('http://localhost:5200/socket/chat')
        this.place = io('http://localhost:5200/socket/place')

        console.log('connecting')
        this.chat.on('connect', () => {
            console.log('chat connected')
        })
        this.place.on('connect', () => {
            console.log('place connected')
        })
    }

    emit(channel, event, params) {
        return new Promise((resolve, reject) => {
            channel.emit(event, {
                user: window.__store.user,
                data: {
                    ...params
                }
            }, result => {
                resolve(result)
            })
        })
    }

    on(channel, event, cb) {
        channel.on(event, cb)
    }
}