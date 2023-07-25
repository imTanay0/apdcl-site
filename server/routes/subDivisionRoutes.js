import express from "express";
import {
  insertSubDivision,
  GetAllSubDivisions,
  GetSubDivisionsByDivision,
  GetSubDivisionNamesByDivision,
} from "../controller/subDivisionController.js";

const router = express.Router();

router.post("/add", insertSubDivision);

router.get("/getall", GetAllSubDivisions);

router.get("/get", GetSubDivisionsByDivision);

router.get("/getallnames", GetSubDivisionNamesByDivision);


export default router;
