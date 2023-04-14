const Message = require('../models/messageModel')
const mongoose = require('mongoose')


// get message history based on room number
const getMessage = async (req, res) => {

    const { room_num } = req.params

    const result = await Message.find({room: room_num})
  
    res.status(200).json(result)
}

// Create new messages
const receivedMessage = async (req, res) => {

    const {room, author, message, time} = req.body

    try {
        const messgae = await Message.create({room, author, message, time})
        res.status(200).json(messgae)
      } catch (error) {
        res.status(400).json({error: error.message})
      }
}

module.exports = {
    getMessage,
    receivedMessage
  }
  
  
