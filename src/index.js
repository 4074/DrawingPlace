import express from 'express'
import bodyParser from 'body-parser'
import http from 'http'

import config from './config'
import './connection'
import session from './session'
import api from './api'
import Socket from './sockets'


const app = express()

app.use(express.static(__dirname + '/../app/build'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(session())

app.use((req, res, next) => {
    if (req.path.indexOf('/api') === 0) {
        return next()
    }
    
    res.sendFile(__dirname + '/../app/build/index.html')
})

app.use('/api', api)

const server = http.Server(app)
Socket(server)

server.listen(config.app.port, (err) => {
    if (err) {
        console.error(error)
    } else {
        console.info(`app is running on ${config.app.port}`)
    }
})