import express from 'express'
import socketio from 'socket.io'

import chat from './chat'
import place from './place'

const router = express.Router()

export default function(server) {
    const io = socketio(server)
    io.of('/socket/chat').on('connection', (socket) => {
        console.log('connected')
        chat(socket)
    })
    
    io.of('/socket/place').on('connection', (socket) => {
        place(socket)
    })
}
