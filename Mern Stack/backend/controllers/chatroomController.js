const Chatroom = require('../models/Chatroom')

// Get an existing chatroom or create a chatroom
const createChatroom = async (req, res) => {

    try {
        const { user1_id, user2_id, project_id } = req.body;
        console.log(user1_id, user2_id, project_id)

        // Check if a chatroom already exists between these two users
        let chatroom = await Chatroom.findOne({
            users: { $all: [user1_id, user2_id] },
            project_id: project_id
        });

        if (!chatroom) {
            // If chatroom doesn't exist, create a new one
            chatroom = new Chatroom({
                users: [user1_id, user2_id],
                project_id: project_id,
            });
            await chatroom.save();
        }

        res.status(200).json(chatroom);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get all existing chatroom for a user
const getAllChatrooms = async (req, res) => {

    try {
        const chatrooms = await Chatroom.find({ users: req.params.userId }).populate('users');
        res.status(200).json(chatrooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createChatroom,
    getAllChatrooms
}


