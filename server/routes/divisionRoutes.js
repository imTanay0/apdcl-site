import express from "express";

import { InsertDivision, GetAllDivisions, GetDivisionsByCircle } from "../controller/divisionController.js";

const router = express.Router();

router.post("/add", InsertDivision);

router.get("/getall", GetAllDivisions);

router.get("/get", GetDivisionsByCircle);

export default router;
