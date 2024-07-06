import React, { useState } from 'react'
import { TextField, Button, Typography, Container } from '@mui/material'
import symptomService from '../../services/SymptomChecker/symptomService'
import './SymptomChecker.module.css'

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState('')
  const [response, setResponse] = useState('')

  const onChange = (e) => {
    setSymptoms(e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await symptomService.checkSymptoms(symptoms)
      setResponse(result.message)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <Container maxWidth="sm" className="symptom-checker-container">
      <Typography variant="h4" component="h1" gutterBottom>
        Symptom Checker
      </Typography>
      <form onSubmit={onSubmit} className="form">
        <TextField
          label="Enter your symptoms"
          variant="outlined"
          fullWidth
          value={symptoms}
          onChange={onChange}
          required
          multiline
          rows={4}
          className="form-field"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Check Symptoms
        </Button>
      </form>
      {response && (
        <Typography variant="h6" component="h2" gutterBottom>
          Possible Conditions:
        </Typography>
      )}
      <Typography variant="body1" component="p">
        {response}
      </Typography>
    </Container>
  )
}

export default SymptomChecker
