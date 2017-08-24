import { jsonit } from '../utils'
import { PlaceService } from '../services'

export default function draw(socket) {
    socket.on('draw', (params, cb) => {
        const { user, data } = params
        socket.emit('draw', data)
        socket.broadcast.emit('draw', data)
        cb(jsonit(true))

        // save to database
        PlaceService.createAction({
            point: data,
            user: user.username
        })

        PlaceService.savePoint({
            ...data,
            user: user.username
        })
    })
}