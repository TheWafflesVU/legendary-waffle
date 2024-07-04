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

// Check for existence of a chatroom for two users and a project. If not, then create a chatroom for them.
router.post('/', createChatroom)

// Create new messages in database
router.get('/all/:userId', getAllChatrooms)

// Get the details of a chatroom
router.get('/:chatroom_id', getChatroomDetails)

module.exports = router
