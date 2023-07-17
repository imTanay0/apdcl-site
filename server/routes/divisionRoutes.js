import express from "express";

import { InsertDivision, GetAllDivisions } from "../controller/divisionController.js";

const router = express.Router();

router.post("/add", InsertDivision);

router.get("/getall", GetAllDivisions);


export default router;
