import express from 'express'
import User from '../models/User'

import { UserService } from '../services'
import { createResponseJSON } from '../utils'

const router = express.Router()

router.post('/login', (req, res) => {
    const params = req.body

    if (!params.username || !params.password) {
        return res.json(createResponseJSON(false, "参数不足"))
    }

    UserService.login(params).then(data => {
        res.json(createResponseJSON(true, data))
    }, (err) => {
        res.json(createResponseJSON(false, err.message))
    })
})

router.post('/signup', (req, res) => {
    const params = req.body

    UserService.signup({
        username: params.username,
        password: params.password
    }).then((data) => {
        res.json(createResponseJSON(true, data))
    }).catch((err) => {
        res.json(createResponseJSON(false, err.message))
    })
})

export default router
