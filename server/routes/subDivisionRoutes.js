import express from 'express'
import { insertSubDivision, GetAllSubDivisions, GetSubDivisionsByDivision } from '../controller/subDivisionController.js'

const router = express.Router()

router.post('/add', insertSubDivision)

router.get('/getall', GetAllSubDivisions);

router.get('/get', GetSubDivisionsByDivision)


export default router
