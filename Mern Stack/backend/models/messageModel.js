const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  chatroom_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chatroom',
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
