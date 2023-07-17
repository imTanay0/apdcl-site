import express from "express";

import { InsertDivision } from "../controller/divisionController.js";

const router = express.Router();

router.post("/add", InsertDivision);

export default router;
