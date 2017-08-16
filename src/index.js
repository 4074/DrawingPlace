import express from 'express'
import bodyParser from 'body-parser'

import config from './config'
import './connection'
import session from './session'
import route from './route'

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(session())

route(app)

app.listen(config.app.port, (err) => {
    if (err) {
        console.error(error)
    } else {
        console.info(`app is running on ${config.app.port}`)
    }
})