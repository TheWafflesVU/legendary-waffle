const express = require('express')
const auth = require('../middleware/requireAuth')

// controller functions
<<<<<<< HEAD
const { loginUser, signupUser, updateUser, deleteUser, getUser } = require('../controllers/userController')
=======
const { loginUser, signupUser, updateUser, deleteUser, joinRoom, getRoomNumber } = require('../controllers/userController')
>>>>>>> 349291ac (Chatbox fully functional)

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// update route
router.put('/:id', auth, updateUser)

// delete route
router.delete('/:email', auth, deleteUser)

<<<<<<< HEAD
// GET a user profile
router.get('/:id', auth, getUser)
=======
// join room route
router.patch('/join_room', auth, joinRoom)

// Get all room number routes for a user
router.get('/room_num', auth, getRoomNumber)
>>>>>>> 349291ac (Chatbox fully functional)

module.exports = router