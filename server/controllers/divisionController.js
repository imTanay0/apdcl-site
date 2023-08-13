import Division from "../models/DivisionModel.js";
import Circle from "../models/CircleModel.js";
import SubDivision from "../models/SubDivisionModel.js";

import getYears from "../utils/getYears.js";
import sortByMonthAndYear from "../utils/sortMonthlyYearly.js";
import {
  calcARR,
  calcAT_CLossesIRCA,
  calcAvgBillingRate,
  calcBillingEfficiency,
  calcCE,
} from "../utils/calcOutputParams.js";

// Insert a new Division
export const InsertDivision = async (req, res) => {
  try {
    const { name, circleName } = req.body;

    const existingDivision = await Division.findOne({ name });

    if (existingDivision) {
      return res.status(409).json({
        success: false,
        message: "Division already exists.",
      });
    }

    const circle = await Circle.findOne({ name: circleName });

    if (!circle) {
      return res.status(404).json({
        success: false,
        message: "No circles found. Check the Circle name again.",
      });
    }

    const newDivision = await Division.create({
      name,
      circle: {
        name: circleName,
        id: circle._id,
      },
    });

    res.status(200).json({
      success: true,
      division: newDivision,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all divisions
export const GetAllDivisions = async (req, res) => {
  try {
    const divisions = await Division.find();

    if (!divisions) {
      return res.status(404).json({
        success: false,
        message: "No divisions available.",
      });
    }

    res.status(200).json({
      success: true,
      divisions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get divisions under a cirle
export const GetDivisionsByCircle = async (req, res) => {
  try {
    const { circleName } = req.body;

    const circle = await Circle.findOne({ name: circleName });

    if (!circle) {
      return res.status(404).json({
        success: false,
        message: "Eroor, Check the Circle name again.",
      });
    }

    const divisions = await Division.find({ "circle.name": circleName });

    if (!divisions || divisions.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No divisions found.",
      });
    }

    res.status(200).json({
      success: true,
      divisions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all Names of the Divisions under a Circle
export const GetDivisionNamesByCircle = async (req, res) => {
  try {
    const circleName = req.query.circleName;

    const circle = await Circle.findOne({ name: circleName });

    if (!circle) {
      return res.status(404).json({
        success: false,
        message: "Error, Check the Circle name again.",
      });
    }

    const divisions = await Division.find({ "circle.name": circleName });

    if (!divisions || divisions.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No divisions found.",
      });
    }

    const divisionNames = divisions.map((division) => division.name);

    res.status(200).json({
      success: true,
      divisionNames,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET Yearly Division Data
export const GetYearlyDivisionsDetails = async (req, res) => {
  try {
    const { circleName, divisionName, financialYear } = req.query;

    const [startYear, endYear] = getYears(financialYear);

    const circle = await Circle.findOne({ name: circleName });
    if (!circle) {
      return res.status(404).json({
        success: false,
        message: `No Circle, ${circleName} Found`,
      });
    }

    const division = await Division.findOne({ name: divisionName });
    if (!division) {
      return res.status(404).json({
        success: false,
        message: `No Division, ${divisionName} Found`,
      });
    }

    // Find all sub divisions on the financial year
    const subDivisions = await SubDivision.find({
      "division.name": divisionName,
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
        message: `No Sub-Division Found under Division, ${divisionName}`,
      });
    }

    const sortedSubDivisions = subDivisions.sort(sortByMonthAndYear);

    // Calculate (sum of the sub divisions) = divisions according to the months
    const divisionResult = [];

    sortedSubDivisions.forEach((subDivision) => {
      const { date } = subDivision;
      const { month, year } = date;

      // Find if the division result for the current month already exists
      const existingDivisionResult = divisionResult.find(
        (result) => result.month === month && result.year === year
      );

      if (!existingDivisionResult) {
        // If the division result for the current month doesn't exist, create it
        divisionResult.push({
          month,
          year,
          MUinjection: subDivision.MUinjection,
          unitBilled: subDivision.unitBilled,
          totalCollection: subDivision.totalCollectionIRCA,
          currentDemand: subDivision.currentDemandIRCA,
        });
      } else {
        // If the division result for the current month exists, update its values
        existingDivisionResult.MUinjection += subDivision.MUinjection;
        existingDivisionResult.unitBilled += subDivision.unitBilled;
        existingDivisionResult.totalCollection +=
          subDivision.totalCollectionIRCA;
        existingDivisionResult.currentDemand += subDivision.currentDemandIRCA;
      }
    });

    const updatedDivisionResult = divisionResult.map((division) => {
      var { unitBilled, MUinjection, totalCollection, currentDemand } =
        division;

      // Check if required data is available and valid
      if (unitBilled && MUinjection && totalCollection && currentDemand) {
        var BE = calcBillingEfficiency(unitBilled, MUinjection);
        var AT_CLosses = calcAT_CLossesIRCA(totalCollection, currentDemand, BE);
        var ABR = calcAvgBillingRate(currentDemand, unitBilled);
        var ARR = calcARR(totalCollection, MUinjection);
        var CE = calcCE(currentDemand, totalCollection);

        MUinjection = parseFloat(parseFloat(MUinjection).toFixed(3));
        unitBilled = parseFloat(parseFloat(unitBilled).toFixed(3));
        totalCollection = parseFloat(parseFloat(totalCollection).toFixed(2));
        currentDemand = parseFloat(parseFloat(currentDemand).toFixed(2));

        BE = parseInt(BE * 100);
        CE = parseInt(CE * 100);
        AT_CLosses = parseInt(AT_CLosses * 100);

        return {
          ...division,
          MUinjection,
          unitBilled,
          totalCollection,
          currentDemand,
          BE,
          AT_CLosses,
          ABR,
          ARR,
          CE,
        };
      }
    });

    res.status(200).json({
      updatedDivisionResult,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
