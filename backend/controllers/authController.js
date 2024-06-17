const process = require('process')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

exports.signup = async (req, res) => {
  const { username, email, password, medicalId, role, phoneNumber } = req.body
  try {
    const user = new User({
      username,
      email,
      password,
      medicalId,
      role,
      phoneNumber,
    })
    await user.save()
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    ) // Use the secret from environment variables
    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

exports.login = async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ username })
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    ) // Use the secret from environment variables
    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
