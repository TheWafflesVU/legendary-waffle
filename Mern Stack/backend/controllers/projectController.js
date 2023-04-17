const Project = require('../models/projectModel')
const mongoose = require('mongoose')

// get all projects
const getProjects = async (req, res) => {

  const projects = await Project.find()

  res.status(200).json(projects)
}

// get all projects in CP
const getProjectsH = async (req, res) => {

  const user_id = req.user._id

  const projects = await Project.find({user_id}).sort({createdAt: -1})

  res.status(200).json(projects)
}

// get a single project
const getProject = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such project'})
  }

  const project = await Project.findById(id)

  if (!project) {
    return res.status(404).json({error: 'No such project'})
  }
  
  res.status(200).json(project)
}

// create new project
const createProject = async (req, res) => {
  const { title, description, tags, nums} = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!description) {
    emptyFields.push("description");
  }
  if (!nums) {
    emptyFields.push("nums");
  }
  if (!tags) {
    emptyFields.push("tags");
  }
  
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // add doc to db
  try {
    const user_id = req.user._id;
    const email = req.user.email;
    
    const project = await Project.create({ title, description, nums, tags, email, user_id });
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a project
const deleteProject = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such project'})
  }

  const project = await Project.findOneAndDelete({_id: id})

  if (!project) {
    return res.status(400).json({error: 'No such project'})
  }

  res.status(200).json(project)
}

// update a project
const updateProject = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such project'})
  }

  const project = await Project.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!project) {
    return res.status(400).json({error: 'No such project'})
  }

  res.status(200).json(project)
}


// search project based on tags/text
const searchProject = async (req, res) => {


  const tagsFilter = req.params.tags.split(',')
  const searchQuery = req.params.q

  console.log(searchQuery)
  console.log(tagsFilter)

  let pro = {}

  if (searchQuery == "NULL" && tagsFilter[0] == "NULL"){
    console.log("List all projects")
    pro = await Project.find()
  } else {
    
    if (searchQuery == "NULL"){
      console.log("Search based on tag")
      pro = await Project.aggregate([
        {
          $match: {
            tags: { $in: tagsFilter }
          }
        },
        {
          $project: {
            _id: 1,
            title: 1,
            description: 1,
            tags: 1,
            nums: 1,
            matchedTags: { $size: { $setIntersection: ["$tags", tagsFilter] } }, // count the number of matched tags
            temp: { $setIntersection: [tagsFilter, "$tags"] }
          }
        },
        {
          $sort: {
            matchedTags: 1, // sort by the number of matched tags, in descending order
          }
        }
      ])

      console.log(pro);
  } else if (tagsFilter[0] == 'NULL'){
    console.log("Search based on keywords")
    pro = await Project.aggregate([
      {
        $match: {
          $text: {
            $search: searchQuery,
            $caseSensitive: false,
            $diacriticSensitive: false
          }
        }
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          tags: 1,
          nums: 1,
          score: { $meta: "textScore" }, // include the relevance score in the output
        }
      },
      {
        $sort: {
          score: { $meta: "textScore" } // then sort by relevance score, in descending order
        }
      }
    ])
  } else {
    console.log("Search based on both inputs")
    pro = await Project.aggregate([
      {
        $match: {
          $text: {
            $search: searchQuery, // perform text-based search on the title and description fields
            $caseSensitive: false,
            $diacriticSensitive: false
          },
          tags: { $in: tagsFilter } // filter documents by tags using the $in operator
        }
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          tags: 1,
          nums: 1,
          score: { $meta: "textScore" }, // include the relevance score in the output
          matchedTags: { $size: { $setIntersection: [tagsFilter, "$tags"] } } // count the number of matched tags
        }
      },
      {
        $sort: {
          matchedTags: 1, // sort by the number of matched tags, in descending order
          score: { $meta: "textScore" } // then sort by relevance score, in descending order
        }
      }
    ])
  }
  }

  res.status(200).json(pro)
}



module.exports = {
  getProjects,
  getProject,
  getProjectsH,
  createProject,
  deleteProject,
  updateProject,
  searchProject
}

