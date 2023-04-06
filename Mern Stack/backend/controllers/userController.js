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
  const { _id } = req.user;

  try {
    const user = await User.delete(_id)
    res.status(200).json({ message: 'User deleted', user: user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// update a user
const updateUser = async (req, res) => {
  const { lastName, firstName, phoneNumber, year, languages, roles } = req.body;

  // Verify user is authenticated
  const { _id } = req.user;

  try {
    // Find user by ID
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update only the provided fields
    if (lastName) user.lastName = lastName;
    if (firstName) user.firstName = firstName;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (year) user.year = year;
    if (languages) user.languages = languages;
    if (roles) user.roles = roles;

    await user.save();

    res.json({ message: 'User profile updated successfully' });

  } catch (err) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { signupUser, loginUser, deleteUser, updateUser }