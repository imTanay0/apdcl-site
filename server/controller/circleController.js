import Circle from '../models/CircleModel.js'

// Add a new circle
export const addCircle = async (req, res) => {
  try {
    const { name } = req.body

    let circle = await Circle.findOne({ name })

    if (circle) {
      return res.status(409).json({
        success: false,
        message: 'Circle Already Exist',
      })
    }

    const newCircle = await Circle.create({
      name,
    })

    res.status(201).json({
      success: true,
      circle: newCircle,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Get All Circles
export const getAllCircles = async (req, res) => {
  try {
    const circles = await Circle.find()

    if (!circles || circle.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No circles found',
      })
    }

    res.status(200).json({
      success: true,
      circles,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
