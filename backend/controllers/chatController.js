const Chat = require('../models/chatModel')
const { getSocketIo } = require('../socket')

exports.sendMessage = async (req, res) => {
  try {
    const { receiver, message } = req.body
    const chat = new Chat({
      sender: req.userId,
      receiver,
      message,
    })
    await chat.save()

    const io = getSocketIo()
    io.emit('receiveMessage', chat) // Emit the message to all connected clients

    res.status(201).json(chat)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.getMessages = async (req, res) => {
  try {
    const { userId1, userId2 } = req.params
    const messages = await Chat.find({
      $or: [
        { sender: userId1, receiver: userId2 },
        { sender: userId2, receiver: userId1 },
      ],
    }).sort('timestamp')
    res.status(200).json(messages)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
