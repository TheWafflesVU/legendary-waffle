const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const axios = require("axios")

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.signup(email, password)

    const r = await axios.put(
      "https://api.chatengine.io/users/",
      { username: email, secret: email},
      { headers: { "Private-Key": "6db25de1-7712-4d48-a4b0-dc325eb36cf7" } }
    )

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a user
const deleteUser = async (req, res) => {
  const {email, password} = req.body

  try {
    await User.findByIdAndDelete(req.user_id)
    res.json({message: "User deleted Successfully"})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { signupUser, loginUser, deleteUser }