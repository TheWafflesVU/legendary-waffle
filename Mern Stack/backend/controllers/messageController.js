const Message = require('../models/messageModel')


// Get all messages in a chatroom
const getMessage = async (req, res) => {

    const { chatroom_id } = req.params

    const result = await Message.find({chatroom_id: chatroom_id})

    res.status(200).json(result)
}

// Create new messages
const sendMessage = async (req, res) => {

    const {chatroom_id, author_id, content} = req.body

    try {

        console.log(chatroom_id, author_id, content)
        const message = await Message.create(
            {
                chatroom_id: chatroom_id,
                user_id: author_id,
                content: content
            })

        // Broadcast the message to the chatroom asynchronously
        req.io.in(chatroom_id).emit('receive_message', message)

        res.status(200).json(message)
      } catch (error) {
        res.status(400).json({error: error.message})
      }
}

module.exports = {
    getMessage,
    sendMessage
  }


