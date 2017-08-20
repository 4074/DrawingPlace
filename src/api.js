import express from 'express'
import http from 'http'

import {
    HomeController,
    AuthController,
    PlaceController
} from './controllers'

const router = express.Router()

router.use('/home', HomeController)
router.use('/auth', AuthController)
router.use('/place', PlaceController)

export default router