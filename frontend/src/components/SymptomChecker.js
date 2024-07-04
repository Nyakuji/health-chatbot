import React, { useState } from 'react'
import symptomService from '../services/symptomService'
import authService from '../services/authService'

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState('')
  const [response, setResponse] = useState('')
  const [error, setError] = useState(null)

  const onChange = (e) => {
    setSymptoms(e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = authService.getCurrentUser().token
      const symptomsData = {
        symptoms: symptoms.split(',').map((symptom) => symptom.trim()),
      }
      const result = await symptomService.checkSymptoms(symptomsData, token)
      setResponse(result.message)
      setError(null)
    } catch (err) {
      console.error('Error:', err)
      setError(err.response ? err.response.data : err.message)
    }
  }

  return (
    <div>
      <h2>Symptom Checker</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Enter your symptoms (comma-separated):</label>
          <input type="text" value={symptoms} onChange={onChange} required />
        </div>
        <button type="submit">Check Symptoms</button>
      </form>
      {response && (
        <div>
          <h3>Possible Conditions:</h3>
          <p>{response}</p>
        </div>
      )}
      {error && (
        <div>
          <h3>Error:</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  )
}

export default SymptomChecker
