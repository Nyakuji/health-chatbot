import React, { useState } from 'react';
import searchService from '../services/searchService';

const DoctorSearch = () => {
  const [specialty, setSpecialty] = useState('');
  const [location, setLocation] = useState('');
  const [availability, setAvailability] = useState('');
  const [doctors, setDoctors] = useState([{ _id: '', username: '', specialty: '', location: ''}]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const filters = { specialty, location, availability };
    try {
      const results = await searchService.searchDoctors(filters);
      setDoctors(results);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  return (
    <div>
      <h2>Search Doctors</h2>
      <form onSubmit={handleSearch}>
        <div>
          <label>Specialty</label>
          <input type="text" value={specialty} onChange={(e) => setSpecialty(e.target.value)} />
        </div>
        <div>
          <label>Location</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div>
          <label>Availability</label>
          <input type="text" value={availability} onChange={(e) => setAvailability(e.target.value)} />
        </div>
        <button type="submit">Search</button>
      </form>
      <h2>Results</h2>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor._id}>
            Dr. {doctor.username}, {doctor.specialty} - {doctor.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorSearch;
