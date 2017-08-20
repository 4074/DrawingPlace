import express from 'express'

import { PlaceService } from '../services'
import { jsonit } from '../utils'

const router = express.Router()

router.get('/get', (req, res) => {
    PlaceService.find().then(data => {
        const canvasData = [{
            x: 100,
            y: 100,
            w: 1,
            h: 40,
            c: '#000'
        }]
        res.json(jsonit(true, canvasData))
    }).catch(err => {
        res.json(jsonit(false, err.message))
    })
})

export default router