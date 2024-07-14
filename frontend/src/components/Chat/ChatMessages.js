import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { getMessages } from '../../services/api'
import { subscribeToMessages } from '../../services/socket'
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Box,
} from '@mui/material'

const ChatMessages = ({ userId1, userId2 }) => {
  const [messages, setMessages] = useState([
    { _id: '', message: '', sender: '', receiver: '' },
  ])

  useEffect(() => {
    getMessages(userId1, userId2)
      .then((response) => {
        setMessages(response.data)
      })
      .catch((error) => {
        console.error(error) // eslint-disable-line no-console
      })

    subscribeToMessages((message) => {
      if (
        (message.sender === userId1 && message.receiver === userId2) ||
        (message.sender === userId2 && message.receiver === userId1)
      ) {
        setMessages((prevMessages) => [...prevMessages, message])
      }
    })
  }, [userId1, userId2])

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ maxHeight: '400px', overflow: 'auto', p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Chat Messages
        </Typography>
        <List>
          {messages.length > 0 ? (
            messages.map((msg) => (
              <ListItem
                key={msg._id}
                sx={{ mb: 1, borderRadius: 1, bgcolor: 'background.paper' }}
              >
                <ListItemText
                  primary={msg.message}
                  secondary={`From: ${msg.sender} To: ${msg.receiver}`}
                  sx={{ wordBreak: 'break-word' }}
                />
              </ListItem>
            ))
          ) : (
            <Box textAlign="center" mt={2}>
              <Typography variant="body1" color="text.secondary">
                No messages yet.
              </Typography>
            </Box>
          )}
        </List>
      </Paper>
    </Container>
  )
}

ChatMessages.propTypes = {
  userId1: PropTypes.string.isRequired,
  userId2: PropTypes.string.isRequired,
}

export default ChatMessages
