const express = require('express')
const {
    getTag,
    addTag
} = require('../controllers/tagController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all project routes
router.use(requireAuth)

// Get the messages based on room number
router.get('/:type', getTag)

// Route to add a new option
router.post('/', addTag);

module.exports = router
