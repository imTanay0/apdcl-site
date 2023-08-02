import { get } from "mongoose";
import Division from "../models/DivisionModel.js";
import SubDivision from "../models/SubDivisionModel.js";
import getYears from "../utils/getYears.js";
import {
  calcCE,
  calcBillingEfficiency,
  calcAT_CLossesIRCA,
  calcAvgBillingRate,
  calcARR,
} from "../utils/calcOutputParams.js";

// Insert a new sub-division
export const insertSubDivision = async (req, res) => {
  try {
    const {
      name,
      MUinjection,
      unitBilled,
      noOfConsumers,
      noOfBillsServed,
      totalCollectionIRCA,
      currentDemandIRCA,
      totalArrear,
      date,
      divisionName,
    } = req.body;

    const { month, year } = date;

    let subDivision = await SubDivision.findOne({
      name,
      "date.month": month,
      "date.year": year,
    });

    if (subDivision) {
      return res.status(409).json({
        success: false,
        message: "Sub-Division already exists.",
      });
    }

    const findDivision = await Division.findOne({ name: divisionName });

    if (!findDivision) {
      return res.status(404).json({
        success: false,
        message: "No division found. Check the division name again.",
      });
    }

    subDivision = await SubDivision.create({
      name,
      MUinjection,
      unitBilled,
      noOfConsumers,
      noOfBillsServed,
      totalCollectionIRCA,
      currentDemandIRCA,
      totalArrear,
      date: {
        month,
        year,
      },
      division: {
        name: divisionName,
        id: findDivision._id,
      },
    });

    res.status(201).json({
      success: true,
      subDivision,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all sub-divisions
export const GetAllSubDivisions = async (req, res) => {
  try {
    const subDivisions = await SubDivision.find();

    if (!subDivisions || subDivisions.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No subdivisions found.",
      });
    }

    res.status(201).json({
      success: true,
      subDivisions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all sub-division's Name
export const GetAllSubDivisionNames = async (req, res) => {
  try {
    const subDivisions = await SubDivision.find();

    if (!subDivisions || subDivisions.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No subdivisions found.",
      });
    }

    const subDivisionNames = subDivisions.map(
      (subDivision) => subDivision.name
    );

    res.status(201).json({
      success: true,
      subDivisionNames,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get sub-divisions under a division
export const GetSubDivisionsByDivision = async (req, res) => {
  try {
    const { divisionName } = req.body;

    const division = await Division.findOne({ name: divisionName });

    if (!division) {
      return res.status(404).json({
        success: false,
        message: "Incorrect Division name",
      });
    }

    const subDivisions = await SubDivision.find({
      "division.name": divisionName,
    });

    if (!subDivisions || subDivisions.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No Sub Divisions found.",
      });
    }

    res.status(201).json({
      success: true,
      subDivisions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Sub-Division's Name Under a Division
export const GetSubDivisionNamesByDivision = async (req, res) => {
  try {
    const divisionName = req.query.divisionName;

    const division = await Division.findOne({ name: divisionName });

    if (!division) {
      return res.status(404).json({
        success: false,
        message: "Incorrect Division name",
      });
    }

    const subDivisions = await SubDivision.find({
      "division.name": divisionName,
    });

    if (!subDivisions || subDivisions.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No Sub Divisions found.",
      });
    }

    const subDivisionNames = subDivisions.map(
      (subDivision) => subDivision.name
    );

    res.status(201).json({
      success: true,
      subDivisionNames,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get a Sub-Division Details
export const GetSubDivision = async (req, res) => {
  try {
    const { subDivisionName, year, month } = req.query;

    const subDivision = await SubDivision.findOne({
      name: subDivisionName,
      "date.month": month,
      "date.year": year,
    });

    if (!subDivision) {
      return res.status(404).json({
        success: false,
        message: "No Sub-Division Found.",
      });
    }

    res.status(200).json({
      success: true,
      subDivision,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get yearly Sub-Divsion Details
export const GetYearlySubDivisionDetails = async (req, res) => {
  try {
    const { subDivisionName, financialYear } = req.query;

    const [startYear, endYear] = getYears(financialYear);

    const subDivisions = await SubDivision.find({
      name: subDivisionName,
      $or: [
        {
          "date.year": startYear,
          "date.month": {
            $in: [
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ],
          },
        },
        {
          "date.year": endYear,
          "date.month": { $in: ["January", "February", "March"] },
        },
      ],
    });

    if (!subDivisions || subDivisions.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Sub-Division Found.",
      });
    }

    const updatedSubDivisions = subDivisions.map((subDivision) => {
      let BE = calcBillingEfficiency(
        subDivision.unitBilled,
        subDivision.MUinjection
      );
      let AT_CLosses = calcAT_CLossesIRCA(
        subDivision.totalCollectionIRCA,
        subDivision.currentDemandIRCA,
        BE
      );
      let ABR = calcAvgBillingRate(
        subDivision.currentDemandIRCA,
        subDivision.unitBilled
      );
      let ARR = calcARR(
        subDivision.totalCollectionIRCA,
        subDivision.MUinjection
      );
      let CE = calcCE(
        subDivision.totalCollectionIRCA,
        subDivision.currentDemandIRCA
      );

      BE = parseInt(BE * 100);
      AT_CLosses = parseInt(AT_CLosses * 100);
      CE = parseInt(CE * 100);

      return {
        ...subDivision.toObject(),
        BE,
        AT_CLosses,
        ABR,
        ARR,
        CE,
      };
    });

    res.status(200).json({
      success: true,
      updatedSubDivisions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Sum of Sub-Division on Yearly basis
export const GetSubDivisionSumYearly = async (req, res) => {
  try {
    const { subDivisionName, financialYear } = req.query;

    const [startYear, endYear] = getYears(financialYear);

    const subDivisions = await SubDivision.find({
      name: subDivisionName,
      $or: [
        {
          "date.year": startYear,
          "date.month": {
            $in: [
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ],
          },
        },
        {
          "date.year": endYear,
          "date.month": { $in: ["January", "February", "March"] },
        },
      ],
    });

    if (!subDivisions || subDivisions.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Sub-Division Found.",
      });
    }

    const yearlySum = subDivisions.reduce((acc, subDivision) => {
      // todo: Parse the values to 2 digits after decimal
      acc["MUinjection"] =
        (acc["MUinjection"] || 0) + subDivision["MUinjection"];
      acc["unitBilled"] = (acc["unitBilled"] || 0) + subDivision["unitBilled"];
      acc["noOfConsumers"] =
        (acc["noOfConsumers"] || 0) + subDivision["noOfConsumers"];
      acc["noOfBillsServed"] =
        (acc["noOfBillsServed"] || 0) + subDivision["noOfBillsServed"];
      acc["totalCollectionIRCA"] =
        (acc["totalCollectionIRCA"] || 0) + subDivision["totalCollectionIRCA"];
      acc["currentDemandIRCA"] =
        (acc["currentDemandIRCA"] || 0) + subDivision["currentDemandIRCA"];

      acc["totalArrear"] = subDivision["totalArrear"];

      return acc;
    }, {});

    // Output Params
    const BE = calcBillingEfficiency(
      yearlySum.unitBilled,
      yearlySum.MUinjection
    );
    const AT_CLosses = calcAT_CLossesIRCA(
      yearlySum.totalCollectionIRCA,
      yearlySum.currentDemandIRCA,
      BE
    );
    const ABR = calcAvgBillingRate(
      yearlySum.currentDemandIRCA,
      yearlySum.unitBilled
    );
    const ARR = calcARR(yearlySum.totalCollectionIRCA, yearlySum.MUinjection);
    const CE = calcCE(
      yearlySum.totalCollectionIRCA,
      yearlySum.currentDemandIRCA
    );

    const updatedYearlySum = {
      ...yearlySum,
      MUinjection: parseFloat(parseFloat(yearlySum.MUinjection).toFixed(2)),
      unitBilled: parseFloat(parseFloat(yearlySum["unitBilled"]).toFixed(2)),
      totalCollectionIRCA: parseInt(yearlySum.totalCollectionIRCA),
      currentDemandIRCA: parseInt(yearlySum.currentDemandIRCA),
      BE,
      AT_CLosses,
      ABR,
      ARR,
      CE,
    };

    res.status(200).json({
      success: true,
      updatedYearlySum,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
