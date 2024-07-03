const express = require('express')
const {
    getTagsWithType,
    addTag,
    addTagsWithType
} = require('../controllers/tagController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all project routes
router.use(requireAuth)

// Get the messages based on room number
router.get('/:type', getTagsWithType)

// Route to add a new option
router.post('/', addTag);

// Route to add a new option to
router.post('/:type', addTagsWithType);

module.exports = router
