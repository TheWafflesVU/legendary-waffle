const express = require('express')
const {
  createProject,
  getProjects,
  getProjectsH,
  getProject,
  deleteProject,
  updateProject,
  searchProject
} = require('../controllers/projectController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all project routes
router.use(requireAuth)

// GET all projects
router.get('/all', getProjects)

//GET all projects in CP
router.get('/cp', getProjectsH)

// GET a single project
router.get('/:id', getProject)

// GET projects based on search
router.get('/search/:tags/:q', searchProject)

// POST a new project
router.post('/', createProject)

// DELETE a project
router.delete('/:id', deleteProject)

// UPDATE a project
router.patch('/:id', updateProject)


module.exports = router