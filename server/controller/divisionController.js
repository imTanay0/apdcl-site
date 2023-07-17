import Division from "../models/DivisionModel.js";
import Circle from "../models/CircleModel.js";

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
