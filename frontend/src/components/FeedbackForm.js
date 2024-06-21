import PropTypes from 'prop-types'
import React, { useState } from 'react'
import feedbackService from '../services/feedbackService'
import authService from '../services/authService'

const FeedbackForm = ({ doctorId }) => {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = authService.getCurrentUser()
    const feedbackData = { doctorId, patientId: user.id, rating, comment }

    try {
      await feedbackService.submitFeedback(feedbackData)
      setMessage('Feedback submitted successfully')
    } catch (error) {
      setMessage('Error submitting feedback')
      console.error('Feedback submission error:', error)
    }
  }

  return (
    <div>
      <h2>Leave Feedback</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

// Add doctorId to props validation
FeedbackForm.propTypes = {
  doctorId: PropTypes.string.isRequired,
}

export default FeedbackForm
