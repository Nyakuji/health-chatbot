import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import feedbackService from '../../services/Feedback/feedbackService'
import './Feedback.module.css'

const FeedbackList = ({ doctorId }) => {
  const [feedbackList, setFeedbackList] = useState([
    { _id: '', feedback: '', user: '' },
  ])
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const result = await feedbackService.getFeedbackForDoctor(doctorId)
        setFeedbackList(result)
      } catch (error) {
        setMessage(error.response?.data?.message || 'Error fetching feedback')
      }
    }

    fetchFeedback()
  }, [doctorId])

  return (
    <Container maxWidth="sm">
      <Paper className="feedback-list-container">
        <Typography variant="h4" gutterBottom>
          Feedback for Doctor {doctorId}
        </Typography>
        {message && (
          <Typography className="feedback-message">{message}</Typography>
        )}
        <List>
          {feedbackList.map((feedback) => (
            <ListItem key={feedback._id}>
              <ListItemText
                primary={feedback.feedback}
                secondary={`Submitted by: ${feedback.user}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  )
}
FeedbackList.propTypes = {
  doctorId: PropTypes.string.isRequired,
}

export default FeedbackList
