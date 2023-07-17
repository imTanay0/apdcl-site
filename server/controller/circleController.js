import Circle from '../models/CircleModel.js'

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
