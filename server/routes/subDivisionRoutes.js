import express from "express";
import {
  insertSubDivision,
  GetAllSubDivisions,
  GetSubDivisionsByDivision,
  GetSubDivisionNamesByDivision,
  GetSubDivision,
  GetAllSubDivisionNames
} from "../controllers/subDivisionController.js";

const router = express.Router();

router.post("/add", insertSubDivision);

router.get("/getall", GetAllSubDivisions);

router.get("/getnames", GetAllSubDivisionNames);

router.get("/get", GetSubDivisionsByDivision);

router.get("/getallnames", GetSubDivisionNamesByDivision);

router.get("/getdetails", GetSubDivision);

export default router;
