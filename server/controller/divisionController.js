import Division from '../models/DivisionModel.js'
import Circle from '../models/CircleModel.js'

// Insert a new Division
export const InsertDivision = async (req, res) => {
  try {
    const { name, circleName } = req.body

    const existingDivision = await Division.findOne({ name })

    if (existingDivision) {
      return res.status(409).json({
        success: false,
        message: 'Division already exists.',
      })
    }

    const circle = await Circle.findOne({ name: circleName })

    if (!circle) {
      return res.status(404).json({
        success: false,
        message: 'No circles found. Check the Circle name again.',
      })
    }

    const newDivision = await Division.create({
      name,
      circle: {
        name: circleName,
        id: circle._id,
      },
    })

    res.status(200).json({
      success: true,
      division: newDivision,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Get all divisions
export const GetAllDivisions = async (req, res) => {
  try {
    const divisions = await Division.find()

    if (!divisions) {
      return res.status(404).json({
        success: false,
        message: 'No divisions available.',
      })
    }

    res.status(200).json({
      success: true,
      divisions,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Get divisions under a cirle
export const GetDivisionsByCircle = async (req, res) => {
  try {
    const { circleName } = req.body

    const circle = await Circle.findOne({ name: circleName })

    if (!circle) {
      return res.status(404).json({
        success: false,
        message: 'Eroor, Check the Circle name again.',
      })
    }

    const divisions = await Division.find({ 'circle.name': circleName })

    if (!divisions || divisions.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No divisions found.',
      })
    }

    res.status(200).json({
      success: true,
      divisions,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Get all Names of the Divisions under a Circle
export const GetDivisionNamesByCircle = async (req, res) => {
  try {
    const circleName = req.query.circleName;

    const circle = await Circle.findOne({ name: circleName })

    if (!circle) {
      return res.status(404).json({
        success: false,
        message: 'Error, Check the Circle name again.',
      })
    }

    const divisions = await Division.find({ 'circle.name': circleName })

    if (!divisions || divisions.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No divisions found.',
      })
    }

    const divisionNames = divisions.map((division) => (
      division.name
    ))

    console.log(divisionNames);

    res.status(200).json({
      success: true,
      divisionNames,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

