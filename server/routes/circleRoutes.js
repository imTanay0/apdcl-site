import express from 'express'
import { addCircle } from '../controller/circleController.js'

const router = express.Router()

router.post('/add', addCircle)

export default router
