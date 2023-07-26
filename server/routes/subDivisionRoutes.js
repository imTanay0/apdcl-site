import express from "express";
import {
  insertSubDivision,
  GetAllSubDivisions,
  GetSubDivisionsByDivision,
  GetSubDivisionNamesByDivision,
  GetSubDivision,
} from "../controller/subDivisionController.js";

const router = express.Router();

router.post("/add", insertSubDivision);

router.get("/getall", GetAllSubDivisions);

router.get("/get", GetSubDivisionsByDivision);

router.get("/getallnames", GetSubDivisionNamesByDivision);

router.get("/getdetails", GetSubDivision);

export default router;
