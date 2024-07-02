const chai = require('chai')
const sinon = require('sinon')
const chaiHttp = require('chai-http')
const User = require('../../models/userModel')
const authController = require('../../controllers/authController')
const { describe, it, afterEach } = require('@jest/globals')

chai.use(chaiHttp)
chai.should()

describe('Auth Controller', () => {
  afterEach(async () => {
    sinon.restore()
    await User.deleteMany({})
  })

  describe('POST /signup', () => {
    it('should create a new user', async () => {
      const req = {
        body: {
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123',
          medicalId: '12345',
          role: 'patient',
          phoneNumber: '1234567890',
        },
      }
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      }

      await authController.signup(req, res)

      res.status.calledWith(201).should.be.true

      const responseBody = res.json.args[0][0]
      responseBody.should.have.property('token').that.is.a('string')
      responseBody.should.have.property('user').that.is.an('object')
      responseBody.user.should.include({
        username: 'testuser',
        email: 'test@example.com',
        role: 'patient',
      })
    })

    it('should return an error if user already exists', async () => {
      const req = {
        body: {
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123',
          medicalId: '12345',
          role: 'patient',
          phoneNumber: '1234567890',
        },
      }
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      }

      const existingUser = new User(req.body)
      await existingUser.save()

      await authController.signup(req, res)

      res.status.calledWith(400).should.be.true

      const responseBody = res.json.args[0][0]
      responseBody.should.have.property('error').that.is.a('string')
    })
  })

  describe('POST /login', () => {
    it('should login a user and return a token', async () => {
      const user = new User({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        medicalId: '12345',
        role: 'patient',
        phoneNumber: '1234567890',
      })
      await user.save()

      const req = {
        body: {
          username: 'testuser',
          password: 'password123',
        },
      }
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      }

      await authController.login(req, res)

      res.status.calledWith(200).should.be.true

      const responseBody = res.json.args[0][0]
      responseBody.should.have.property('token').that.is.a('string')
      responseBody.should.have.property('user').that.is.an('object')
      responseBody.user.should.include({
        username: 'testuser',
        email: 'test@example.com',
        role: 'patient',
      })
    })

    it('should return an error for invalid credentials', async () => {
      const req = {
        body: {
          username: 'nonexistentuser',
          password: 'wrongpassword',
        },
      }
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      }

      await authController.login(req, res)

      res.status.calledWith(401).should.be.true

      const responseBody = res.json.args[0][0]
      responseBody.should.have.property('error').that.is.a('string')
      responseBody.error.should.equal('Invalid credentials')
    })
  })
})
