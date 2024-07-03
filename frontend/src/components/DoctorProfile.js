import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import feedbackService from '../services/feedbackService'
import FeedbackForm from './FeedbackForm'

const DoctorProfile = ({ doctorId }) => {
  const [feedbacks, setFeedbacks] = useState([
    {
      rating: '',
      comment: '',
      patientId: { username: 'Patient' },
      date: new Date(),
    },
  ])

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const feedbackData =
          await feedbackService.getFeedbackForDoctor(doctorId)
        setFeedbacks(feedbackData)
      } catch (error) {
        console.error('Error fetching feedback:', error) // eslint-disable-line no-console
      }
    }

    fetchFeedbacks()
  }, [doctorId])

  return (
    <div>
      <h2>Doctor Profile</h2>
      <FeedbackForm doctorId={String(doctorId)} />
      <h3>Feedback</h3>
      <ul>
        {feedbacks.map((feedback) => (
          <li key={feedback._id}>
            <p>Rating: {feedback.rating}</p>
            <p>Comment: {feedback.comment}</p>
            <p>By: {feedback.patientId.username}</p>
            <p>On: {new Date(feedback.date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

DoctorProfile.propTypes = {
  doctorId: PropTypes.string.isRequired,
}

export default DoctorProfile
