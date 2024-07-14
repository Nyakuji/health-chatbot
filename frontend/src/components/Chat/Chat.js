import React from 'react'
import PropTypes from 'prop-types'
import { Container, Typography, Paper, Box } from '@mui/material'
import ChatMessages from './ChatMessages'
import ChatInput from './ChatInput'

const Chat = ({ userId1, userId2 }) => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Chat
        </Typography>
        <ChatMessages userId1={userId1} userId2={userId2} />
        <Box mt={2}>
          <ChatInput receiver={userId2} />
        </Box>
      </Paper>
    </Container>
  )
}

Chat.propTypes = {
  userId1: PropTypes.string.isRequired,
  userId2: PropTypes.string.isRequired,
}

export default Chat
