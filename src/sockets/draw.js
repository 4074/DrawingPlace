import { jsonit } from '../utils'

export default function draw(socket) {
    socket.on('draw', (data, cb) => {
        console.log(data)
        socket.emit('draw', data)
        cb(jsonit(true))
    })
}