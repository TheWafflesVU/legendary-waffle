const express = require('express')
const {
  createProject,
  getProjects,
  getProject,
  deleteProject,
  updateProject,
  searchProject,
  getProjectsByUser,
  getAllProjectsExceptThisUser
} = require('../controllers/projectController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all project routes
router.use(requireAuth)

// GET all projects
router.get('/all', getProjects)

// GET all projects except requester
router.get('/allButThisUser/:user_id', getAllProjectsExceptThisUser)

// GET a single project
router.get('/:id', getProject)

// GET all project of a user
router.get('/byUser/:user_id', getProjectsByUser)

// GET projects based on search
router.get('/search/:tags/:q', searchProject)

// POST a new project
router.post('/', createProject)

// DELETE a project
router.delete('/:id', deleteProject)

// UPDATE a project
router.patch('/:id', updateProject)


module.exports = router
