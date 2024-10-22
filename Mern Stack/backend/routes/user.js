const express = require('express')
const auth = require('../middleware/requireAuth')

// controller functions
const { loginUser, signupUser, updateUser, deleteUser, getUser } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// update route
router.put('/:id', auth, updateUser)

// delete route
router.delete('/:email', auth, deleteUser)

// GET a user profile
router.get('/:id', auth, getUser)

module.exports = router
