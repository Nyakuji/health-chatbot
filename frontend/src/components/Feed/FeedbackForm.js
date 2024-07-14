import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { createFeedback } from '../../services/api'
import {
  Container,
  TextField,
  Button,
  Typography,
  Rating,
  Box,
  Paper,
} from '@mui/material'

const FeedbackForm = ({ patientId, doctorId }) => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = { doctorId, patientId, rating, comment }
    createFeedback(data)
      .then((response) => {
        console.log(response.data) // eslint-disable-line no-console
        alert('Feedback submitted successfully')
        setRating(0)
        setComment('')
      })
      .catch((error) => {
        console.error(error) // eslint-disable-line no-console
        alert('Failed to submit feedback')
      })
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Submit Feedback
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box marginBottom={2}>
            <Typography component="legend">Rating</Typography>
            <Rating
              name="rating"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue || 0)
              }}
            />
          </Box>
          <TextField
            label="Comment"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
            multiline
            rows={4}
            margin="normal"
            variant="outlined"
          />
          <Box mt={2} display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Submit
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  )
}

FeedbackForm.propTypes = {
  patientId: PropTypes.string.isRequired,
  doctorId: PropTypes.string.isRequired,
}

export default FeedbackForm
