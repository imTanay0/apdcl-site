import express from 'express'
import { insertSubDivision } from '../controller/subDivisionController.js'

const router = express.Router()

router.post('/add', insertSubDivision)

export default router
