import express from 'express'
import { addCircle, getAllCircleNames } from '../controllers/circleController.js'

const router = express.Router()

router.post('/add', addCircle)

router.get('/getAllNames', getAllCircleNames)

export default router
