const mongoose = require('mongoose');

const chatroomSchema = new mongoose.Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }],
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

const Chatroom = mongoose.model('Chatroom', chatroomSchema);

module.exports = Chatroom;
