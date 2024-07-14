import React, { useState } from 'react'
import { checkSymptoms } from '../../services/api'
import {
  Container,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Box,
  Paper,
} from '@mui/material'

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    checkSymptoms({ symptoms })
      .then((response) => {
        setResult(response.data.message)
        setLoading(false)
      })
      .catch((error) => {
        console.error(error) // eslint-disable-line no-console
        setLoading(false)
        alert('Failed to check symptoms')
      })
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Symptom Checker
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Enter your symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
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
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Check Symptoms'}
            </Button>
          </Box>
        </form>
        {result && (
          <Box mt={4}>
            <Typography variant="h6">Results:</Typography>
            <Typography variant="body1">{result}</Typography>
          </Box>
        )}
      </Paper>
    </Container>
  )
}

export default SymptomChecker
