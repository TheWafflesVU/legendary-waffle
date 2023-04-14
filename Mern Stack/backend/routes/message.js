const express = require('express')
const {
    getMessage,
    receivedMessage
} = require('../controllers/messageController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all project routes
router.use(requireAuth)

// Get the messages based on room number
router.get('/:room_num', getMessage)

// Create new messages in database
router.post('/', receivedMessage)

module.exports = router