import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { getFeedbackForDoctor } from '../../services/api'
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  CircularProgress,
  Paper,
  Box,
  Rating,
} from '@mui/material'

const DoctorFeedback = () => {
  const { userData } = useAuth()
  const [feedbacks, setFeedbacks] = useState([
    { _id: '', rating: 0, comment: '', patientId: { username: '' } },
  ])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getFeedbackForDoctor(userData._id)
      .then((response) => {
        setFeedbacks(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error(error) // eslint-disable-line no-console
        setLoading(false)
      })
  }, [userData._id])

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Doctor Feedback
        </Typography>
        <List>
          {feedbacks.map((feedback) => (
            <ListItem key={feedback._id} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>{feedback.patientId.username[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <>
                    <Typography variant="h6">
                      {feedback.patientId.username}
                    </Typography>
                    <Rating value={feedback.rating} readOnly />
                  </>
                }
                secondary={feedback.comment}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  )
}

export default DoctorFeedback
