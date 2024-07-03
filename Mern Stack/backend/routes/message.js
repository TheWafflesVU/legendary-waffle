const express = require('express')
const {
    getMessage,
    sendMessage
} = require('../controllers/messageController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all project routes
router.use(requireAuth)

// Get the messages based on room number
router.get('/:chatroom_id', getMessage)

// Create & Broadcast a new messages in database
router.post('/send', sendMessage)

module.exports = router
