import User from '../models/UserModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    let user = await User.findOne({ email })

    if (user) {
      return res.status(409).json({
        success: false,
        message: "Already signed up. Login now",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10)

    user = await User.create({
      name,
      email,
      password: hashPassword,
    })

    const token = jwt.sign({ _id: user._id }, 'jwt_secret')

    res
      .status(200)
      .cookie('token', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: 'Registered Successfully',
      })
  } catch (error) {
    console.log(error.message)
  }
}

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Register first',
      })
    }

    const matchingPassword = await bcrypt.compare(password, user.password)

    if (!matchingPassword) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    const token = jwt.sign({ id: user._id }, 'jwt_secret')

    res
      .status(200)
      .cookie('token', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: 'Login Successfully',
      })
  } catch (error) {
    console.log(error.message)
  }
}
