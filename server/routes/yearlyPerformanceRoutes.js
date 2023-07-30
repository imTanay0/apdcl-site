import express from 'express';

import {addPerformance, getPerformance} from '../controllers/yearlyPerformanceController.js';

const router = express.Router();

router.post('/add', addPerformance);

router.get('/getall', getPerformance);

export default router;