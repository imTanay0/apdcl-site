import express from 'express'
import { addCircle, getAllCircles } from '../controller/circleController.js'

const router = express.Router()

router.post('/add', addCircle)

router.get('/getAll', getAllCircles)

export default router
