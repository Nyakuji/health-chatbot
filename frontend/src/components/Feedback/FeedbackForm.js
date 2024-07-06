import React, { useState } from 'react'
import { Button, TextField, Container, Typography, Paper } from '@mui/material'
import feedbackService from '../../services/Feedback/feedbackService'
import './Feedback.module.css'

const FeedbackForm = () => {
  const [doctorId, setDoctorId] = useState('')
  const [feedback, setFeedback] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const feedbackData = { doctorId, feedback }
      const result = await feedbackService.createFeedback(feedbackData)
      setMessage(result.message)
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error submitting feedback')
    }
  }

  return (
    <Container maxWidth="sm">
      <Paper className="feedback-form-container">
        <Typography variant="h4" gutterBottom>
          Submit Feedback
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Doctor ID"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            fullWidth
            required
            multiline
            rows={4}
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
        {message && (
          <Typography className="feedback-message">{message}</Typography>
        )}
      </Paper>
    </Container>
  )
}

export default FeedbackForm
