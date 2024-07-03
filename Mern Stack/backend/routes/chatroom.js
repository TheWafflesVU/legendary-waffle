const express = require('express')
const {
    createChatroom,
    getAllChatrooms,
    getChatroomDetails,
} = require('../controllers/chatroomController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all project routes
router.use(requireAuth)

// Get the messages based on room number
router.post('/', createChatroom)

// Create new messages in database
router.get('/all/:userId', getAllChatrooms)

// Get the details of a chatroom
router.get('/:chatroom_id', getChatroomDetails)

module.exports = router
