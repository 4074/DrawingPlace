import express from 'express'
import User from '../models/User'

import { UserService } from '../services'
import { jsonit } from '../utils'

const router = express.Router()

router.get('/get', (req, res) => {
    const user = req.session.user ? req.session.user : {
        username: 'nobody'
    }
    req.session.user = user
    res.json(jsonit(true, user))
})

router.post('/login', (req, res) => {
    const params = req.body.data

    if (!params.username || !params.password) {
        return res.json(jsonit(false, "参数不足"))
    }

    UserService.login(params).then(data => {
        req.session.user = data
        res.json(jsonit(true, data))
    }, (err) => {
        res.json(jsonit(false, err.message))
    })
})

router.post('/logout', (req, res) => {
    req.session.regenerate((err) => {
        if (err) console.log(err);
        res.json(jsonit(!err))
    })
})

router.post('/signup', (req, res) => {
    const params = req.body.data

    UserService.signup({
        username: params.username,
        password: params.password
    }).then((data) => {
        req.session.user = data
        res.json(jsonit(true, data))
    }).catch((err) => {
        res.json(jsonit(false, err.message))
    })
})

export default router
