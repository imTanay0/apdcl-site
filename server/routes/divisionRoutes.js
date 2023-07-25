import express from 'express'

import {
  InsertDivision,
  GetAllDivisions,
  GetDivisionsByCircle,
  GetDivisionNamesByCircle
} from '../controller/divisionController.js'

const router = express.Router()

router.post('/add', InsertDivision)

router.get('/getall', GetAllDivisions)

router.get('/get', GetDivisionsByCircle)

router.get('/getallnames', GetDivisionNamesByCircle);

export default router;
