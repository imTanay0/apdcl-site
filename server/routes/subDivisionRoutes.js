import express from 'express'
import { insertSubDivision, GetAllSubDivisions } from '../controller/subDivisionController.js'

const router = express.Router()

router.post('/add', insertSubDivision)

router.get('/getall', GetAllSubDivisions);

export default router
