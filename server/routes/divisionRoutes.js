import express from "express";

import {
  InsertDivision,
  GetAllDivisions,
  GetDivisionsByCircle,
  GetDivisionNamesByCircle,
  GetYearlyDivisionsDetails,
} from "../controllers/divisionController.js";

const router = express.Router();

router.post("/add", InsertDivision);

router.get("/getall", GetAllDivisions);

router.get("/get", GetDivisionsByCircle);

router.get("/getallnames", GetDivisionNamesByCircle);

router.get("/getyearly", GetYearlyDivisionsDetails);

export default router;
