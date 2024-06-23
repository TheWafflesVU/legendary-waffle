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
  num_teammates: {
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
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // Assuming you have a User model
  },
}, { timestamps: true })

projectSchema.index({ title: 'text', description: 'text' })

module.exports = mongoose.model('Project', projectSchema)
