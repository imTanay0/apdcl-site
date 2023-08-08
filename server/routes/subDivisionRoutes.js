import express from "express";
import {
  insertSubDivision,
  GetAllSubDivisions,
  GetSubDivisionsByDivision,
  GetSubDivisionNamesByDivision,
  GetSubDivision,
  GetAllSubDivisionNames,
  GetYearlySubDivisionDetails,
  GetSubDivisionSumYearly,
} from "../controllers/subDivisionController.js";

const router = express.Router();

router.post("/add", insertSubDivision);

router.get("/getall", GetAllSubDivisions);

router.get("/getnames", GetAllSubDivisionNames);

router.get("/get", GetSubDivisionsByDivision);

router.get("/getallnames", GetSubDivisionNamesByDivision);

router.get("/getdetails", GetSubDivision);

router.get("/yearlydetails", GetYearlySubDivisionDetails);

router.get("/getyearlysum", GetSubDivisionSumYearly);

export default router;
