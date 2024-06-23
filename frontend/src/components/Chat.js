import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import chatService from '../services/chatService'
import authService from '../services/authService'

const Chat = ({ receiver }) => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const currentUser = authService.getCurrentUser()

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messages = await chatService.getMessages(currentUser.id, receiver)
        setMessages(messages)
      } catch (error) {
        console.error('Error fetching messages:', error)
      }
    }

    fetchMessages()
  }, [receiver, currentUser.id])

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return

    const messageData = {
      receiver,
      message: newMessage,
    }

    try {
      const message = await chatService.sendMessage(messageData)
      setMessages([...messages, message])
      setNewMessage('')
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  return (
    <div>
      <h2>Chat</h2>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender === currentUser.id ? 'You' : 'Doctor'}:</strong>{' '}
            {msg.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  )
}

Chat.propTypes = {
  receiver: PropTypes.string.isRequired,
}

export default Chat
