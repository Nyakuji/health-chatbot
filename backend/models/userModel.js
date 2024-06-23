const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  phoneNumber: { 
    type: String 
  },
  medicalId: { 
    type: String, 
    unique: true, 
    required: true
  },
  role: { 
    type: String, 
    enum: ['patient', 'doctor', 'admin'], 
    required: true 
  },
  specialty: {
     type: String 
    }, //for doctors
  location: { 
    type: String 
  }, //for doctors
  profilePicture: { 
    type: String, 
    default: '' 
  },
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('User', userSchema)
