require('dotenv').config()
const process = require('process')
const jwt = require('jsonwebtoken')

exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization']
  if (!token) return res.status(403).send('No token provided.')

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(500).send('Failed to authenticate token.')
    req.userId = decoded.id
    req.userRole = decoded.role
    next()
  })
}

exports.isAdmin = (req, res, next) => {
  if (req.userRole !== 'admin')
    return res.status(403).send('Admin role required.')
  next()
}

exports.isDoctor = (req, res, next) => {
  if (req.userRole !== 'doctor')
    return res.status(403).send('Doctor role required.')
  next()
}

exports.isPatient = (req, res, next) => {
  if (req.userRole !== 'patient')
    return res.status(403).send('Patient role required.')
  next()
}
