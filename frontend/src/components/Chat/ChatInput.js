import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { sendMessageSocket } from '../../services/socket'
import { sendMessage } from '../../services/api'
import { TextField, Button, Box, Paper } from '@mui/material'

const ChatInput = ({ receiver }) => {
  const [message, setMessage] = useState('')

  const handleSendMessage = () => {
    const data = { receiver, message }
    sendMessageSocket(data)
    sendMessage(data)
      .then(() => {
        setMessage('')
      })
      .catch((error) => {
        console.error(error) // eslint-disable-line no-console
      })
  }

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
      <Box display="flex" alignItems="center">
        <TextField
          label="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
          sx={{ flexGrow: 1 }}
        />
        <Button
          onClick={handleSendMessage}
          variant="contained"
          color="primary"
          sx={{ ml: 2, height: 'fit-content', alignSelf: 'flex-end' }}
        >
          Send
        </Button>
      </Box>
    </Paper>
  )
}

ChatInput.propTypes = {
  receiver: PropTypes.string.isRequired,
}

export default ChatInput
