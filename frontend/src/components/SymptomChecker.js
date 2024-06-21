import React, { useState } from 'react'
import symptomService from '../services/symptomService'

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
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label>Enter your symptoms:</label>
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
    </div>
  )
}

export default SymptomChecker
