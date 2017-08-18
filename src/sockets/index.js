import express from 'express'
import socketio from 'socket.io'

import chat from './chat'
import draw from './draw'

const router = express.Router()

export default function(server) {
    const io = socketio(server)
    io.of('/socket/chat').on('connection', (socket) => {
        console.log('connected')
        chat(socket)
    })
    
    io.of('/socket/draw').on('connection', (socket) => {
        draw(socket)
    })
}
