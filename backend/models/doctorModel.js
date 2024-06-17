const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  availability: [
    {
      date: { type: Date, required: true },
      slots: [
        {
          time: { type: String, required: true },
          available: { type: Boolean, default: true },
        },
      ],
    },
  ],
})

module.exports = mongoose.model('Doctor', doctorSchema)
