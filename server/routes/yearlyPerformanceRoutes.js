import express from "express";

import {
  addPerformance,
  getPerformance,
  getPerformanceDetails,
} from "../controllers/yearlyPerformanceController.js";

const router = express.Router();

router.post("/add", addPerformance);

router.get("/getall", getPerformance);

router.get("/getdetail", getPerformanceDetails);

export default router;
