const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  room: String,
  sender: String,
  message: String
}, { timestamps: true })

const Message = mongoose.model('Message', messageSchema)

module.exports = Message
