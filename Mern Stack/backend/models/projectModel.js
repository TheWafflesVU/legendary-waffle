const mongoose = require('mongoose')

const Schema = mongoose.Schema

const projectSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: true
  },
  nums: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
   },
  email: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
}, { timestamps: true })

projectSchema.index({ title: 'text', description: 'text' })

module.exports = mongoose.model('Project', projectSchema)