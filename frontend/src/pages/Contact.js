import React from 'react'
import { Container, Typography, Paper, Box } from '@mui/material'
import './Contact.module.css'

const ContactInfo = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="h4" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1">
            If you have any questions or need support, please contact us at:
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center', mb: 1 }}>
          <Typography variant="body1">
            <strong>Email:</strong> support@healthchatbot.com
          </Typography>
          <Typography variant="body1">
            <strong>Phone:</strong> (123) 456-7890
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}

export default ContactInfo
