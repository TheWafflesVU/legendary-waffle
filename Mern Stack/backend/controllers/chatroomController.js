const Chatroom = require('../models/Chatroom')

// Get an existing chatroom or create a chatroom
const createChatroom = async (req, res) => {

    try {
        const { user1_id, user2_id, project_id } = req.body;

        // Check if a chatroom already exists between these two users
        let chatroom = await Chatroom.findOne({
            users: { $all: [user1_id, user2_id] },
            project_id: project_id
        });

        let statusCode = 200
        if (!chatroom) {
            // If chatroom doesn't exist, create a new one
            chatroom = new Chatroom({
                users: [user1_id, user2_id],
                project_id: project_id,
            });
            await chatroom.save();
            statusCode = 201
        }

        await chatroom.populate('project_id', 'title')
        res.status(statusCode).json(chatroom);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get all existing chatroom for a user. Also get the project title
const getAllChatrooms = async (req, res) => {

    try {
        const chatrooms = await Chatroom.find({
            users: req.params.userId
        })
        .populate('project_id', 'title')
        .exec();
        res.status(200).json(chatrooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const getChatroomDetails = async (req, res) => {

    try {
        const { chatroom_id } = req.params;

        const roomDetails = await Chatroom
            .findOne({_id: chatroom_id})
            .populate('project_id', 'title')
            .populate('users', 'lastName firstName email')

        if (!roomDetails) {
            return res.status(404).json({ message: 'Chatroom not found' });
        }

        res.status(200).json(roomDetails)

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createChatroom,
    getAllChatrooms,
    getChatroomDetails
}


