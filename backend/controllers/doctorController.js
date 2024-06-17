const Doctor = require('../models/doctorModel')
const User = require('../models/userModel')

exports.updateAvailability = async (req, res) => {
  const { doctorId, date, slots } = req.body

  try {
    const doctor = await Doctor.findById(doctorId)
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' })
    }

    let availability = doctor.availability.find(
      (a) => a.date.toISOString().split('T')[0] === date,
    )
    if (availability) {
      // Update existing availability
      availability.slots = slots
    } else {
      // Add new availability
      doctor.availability.push({ date, slots })
    }

    await doctor.save()
    res
      .status(200)
      .json({ message: 'Availability updated successfully', doctor })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
}

exports.searchDoctors = async (req, res) => {
  const { specialty, location } = req.query

  try {
    let query = { role: 'doctor' }

    if (specialty) query.specialty = specialty
    if (location) query.location = location

    const doctors = await User.find(query)

    // Optionally filter by availability here
    // For example, using a predefined availability field or method

    res.status(200).json(doctors)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
}
