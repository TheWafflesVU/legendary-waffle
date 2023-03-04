const express = require('express')
const auth = require('../middleware/requireAuth')

// controller functions
const { loginUser, signupUser, deleteUser } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// delete route
router.delete('/delete', auth, deleteUser)

module.exports = router