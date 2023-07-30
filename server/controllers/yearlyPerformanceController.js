import YearlyPerformance from "../models/YearlyPerformanceModel.js";
import SubDivision from "../models/SubDivisionModel.js";

// Insert Yearly Performance
export const addPerformance = async (req, res) => {
  try {
    const {
      subDivisionName,
      year,
      // MUInjection,
      // totalConsumer,
      // MUBilled,
      BE,
      // currentDemand,
      // totalCollection,
      // CE,
      ARR,
      AT_CLosses,
      ABR,
      // totalArrear,
      // consumerPercentageOfBilling,
    } = req.body;

    const subDivision = await SubDivision.findOne({ name: subDivisionName });

    if (!subDivision) {
      return res.status(400).json({
        success: false,
        message: "No Sub-Division Found. Check again.",
      });
    }

    const existingPerformance = await YearlyPerformance.findOne({
      "subDivision.name": subDivisionName,
      year: year,
    });

    if (existingPerformance) {
      return res.status(409).json({
        success: false,
        message: `Yearly performance for ${subDivisionName} already exists.`,
      });
    }

    const yearlyPerformance = await YearlyPerformance.create({
      subDivision: {
        name: subDivision.name,
        id: subDivision._id,
      },
      year,
      // MUInjection,
      // totalConsumer,
      // MUBilled,
      BE,
      // currentDemand,
      // totalCollection,
      // CE,
      ARR,
      AT_CLosses,
      ABR,
      // totalArrear,
      // consumerPercentageOfBilling,
    });

    res.status(200).json({
      success: true,
      yearlyPerformance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all Yearly Performance
export const getPerformance = async (req, res) => {
  try {
    const yearlyPerformances = await YearlyPerformance.find();

    if (!yearlyPerformances || yearlyPerformances.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Yearly Performance Data Found.",
      });
    }

    res.status(200).json({
      success: true,
      yearlyPerformances,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Performance Details
export const getPerformanceDetails = async (req, res) => {
  try {
    const { subDivisionName, year } = req.query;

    const yearlyPerformance = await YearlyPerformance.findOne({
      "subDivision.name": subDivisionName,
      year: year,
    });

    if (!yearlyPerformance) {
      return res.status(404).json({
        success: false,
        message: "No Yearly Performance Data Found.",
      });
    }

    res.status(200).json({
      success: true,
      yearlyPerformance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
