import React, { useState } from 'react'
import searchService from '../services/searchService'

const DoctorSearch = () => {
  const [specialty, setSpecialty] = useState('')
  const [location, setLocation] = useState('')
  const [availability, setAvailability] = useState('')
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const filters = { specialty, location, availability }
    try {
      const results = await searchService.searchDoctors(filters)
      setDoctors(results)
    } catch (error) {
      setError(
        'Search error: ' + (error.response?.data?.message || error.message)
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Search Doctors</h2>
      <form onSubmit={handleSearch}>
        <div>
          <label>Specialty</label>
          <input
            type="text"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
          />
        </div>
        <div>
          <label>Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div>
          <label>Availability</label>
          <input
            type="text"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
          />
        </div>
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <h2>Results</h2>
      <ul>
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <li key={doctor._id}>
              Dr. {doctor.username}, {doctor.specialty} - {doctor.location}
            </li>
          ))
        ) : (
          <p>No doctors found</p>
        )}
      </ul>
    </div>
  )
}

export default DoctorSearch
