import Division from "../models/DivisionModel.js";
import SubDivision from "../models/SubDivisionModel.js";

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

    let subDivision = await SubDivision.findOne({ name });

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
    )

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

// Get Sub-Division Details
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
