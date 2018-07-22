import express from 'express'

import { PlaceService } from '../services'
import { jsonit } from '../utils'

const router = express.Router()

router.get('/get', (req, res) => {

    const colors = [
        '000', 'fff', 'aaa', '555',
        'fed3c7', 'ffc4ce', 'faac8e', 'ff8b83',
        'f44336', 'e91e63', 'e2669e', '9c27b0',
        '673ab7', '3f51b5', '004670', '057197',
        '2196f3', '00bcd4', '3be5db', '97fddc',
        '167300', '37a93c', '89e642', 'd7ff07',
        'fff6d1', 'f8cb8c', 'ffeb3b', 'ffc107',
        'ff9800', 'ff5722', 'b83f27', '795548'
    ]

    PlaceService.findPoints().then(data => {
        const result = {
            colors,
            points: data || [],
            delay: 2
        }
        res.json(jsonit(true, result))
    }).catch(err => {
        res.json(jsonit(false, err.message))
    })
})

export default router