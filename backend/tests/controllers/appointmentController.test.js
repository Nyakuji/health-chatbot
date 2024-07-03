const request = require('supertest')
const sinon = require('sinon')
const app = require('../../app') // Adjust the path to your app file
const Doctor = require('../../models/doctorModel')
const Appointment = require('../../models/appointmentModel')
const { sendNotification } = require('../../services/notificationService')
const { broadcastAvailabilityUpdate } = require('../../websocket')
const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')
const {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  afterAll,
  beforeAll,
} = require('@jest/globals')

describe('Appointment Controller', () => {
  let sandbox, mongoServer

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const mongoUri = mongoServer.getUri()
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
  })

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(async () => {
    sandbox.restore()
    await Doctor.deleteMany({})
    await Appointment.deleteMany({})
  })

  describe('bookAppointment', () => {
    it('should book an appointment successfully', async () => {
      const doctor = new Doctor({
        name: 'Dr. Smith',
        availability: [
          {
            date: new Date(),
            slots: [{ time: '10:00 AM', available: true }],
          },
        ],
      })
      await doctor.save()

      sandbox.stub(sendNotification, 'sendNotification').resolves()

      const response = await request(app)
        .post('/api/appointments/book')
        .send({
          doctorId: doctor._id,
          patientName: 'John Doe',
          date: new Date().toISOString().split('T')[0],
          time: '10:00 AM',
          symptoms: 'Fever',
          contactInfo: 'john@example.com',
          notificationType: 'email',
        })

      expect(response.status).toBe(201)
      expect(response.body.message).toBe('Appointment booked successfully')
      expect(response.body.appointment).toHaveProperty('_id')
    })

    it('should return 404 if doctor is not found', async () => {
      const response = await request(app)
        .post('/api/appointments/book')
        .send({
          doctorId: 'invaliddoctorid',
          patientName: 'John Doe',
          date: new Date().toISOString().split('T')[0],
          time: '10:00 AM',
          symptoms: 'Fever',
          contactInfo: 'john@example.com',
          notificationType: 'email',
        })

      expect(response.status).toBe(404)
      expect(response.body.message).toBe('Doctor not found')
    })

    it('should return 404 if time slot is not available', async () => {
      const doctor = new Doctor({
        name: 'Dr. Smith',
        availability: [
          {
            date: new Date(),
            slots: [{ time: '10:00 AM', available: false }],
          },
        ],
      })
      await doctor.save()

      const response = await request(app)
        .post('/api/appointments/book')
        .send({
          doctorId: doctor._id,
          patientName: 'John Doe',
          date: new Date().toISOString().split('T')[0],
          time: '10:00 AM',
          symptoms: 'Fever',
          contactInfo: 'john@example.com',
          notificationType: 'email',
        })

      expect(response.status).toBe(404)
      expect(response.body.message).toBe('Time slot not available')
    })
  })

  describe('updateAvailability', () => {
    it('should update doctor availability', async () => {
      const doctor = new Doctor({
        name: 'Dr. Smith',
        availability: [
          {
            date: new Date(),
            slots: [{ time: '10:00 AM', available: true }],
          },
        ],
      })
      await doctor.save()

      sandbox
        .stub(broadcastAvailabilityUpdate, 'broadcastAvailabilityUpdate')
        .resolves()

      const newAvailability = [
        {
          date: new Date(),
          slots: [{ time: '11:00 AM', available: true }],
        },
      ]

      const response = await request(app)
        .put('/api/appointments/update-availability')
        .send({ doctorId: doctor._id, availability: newAvailability })

      expect(response.status).toBe(200)
      expect(response.body.message).toBe('Availability updated successfully')

      const updatedDoctor = await Doctor.findById(doctor._id)
      expect(updatedDoctor.availability[0].slots[0].time).toBe('11:00 AM')
    })

    it('should return 404 if doctor is not found', async () => {
      const response = await request(app)
        .put('/api/appointments/update-availability')
        .send({ doctorId: 'invaliddoctorid', availability: [] })

      expect(response.status).toBe(404)
      expect(response.body.message).toBe('Doctor not found')
    })
  })

  describe('getDoctorAvailability', () => {
    it('should get doctor availability', async () => {
      const doctor = new Doctor({
        name: 'Dr. Smith',
        availability: [
          {
            date: new Date(),
            slots: [{ time: '10:00 AM', available: true }],
          },
        ],
      })
      await doctor.save()

      const response = await request(app)
        .get('/api/appointments/availability')
        .query({
          doctorId: doctor._id,
          date: new Date().toISOString().split('T')[0],
        })

      expect(response.status).toBe(200)
      expect(response.body.availability.slots[0].time).toBe('10:00 AM')
    })

    it('should return 404 if doctor is not found', async () => {
      const response = await request(app)
        .get('/api/appointments/availability')
        .query({
          doctorId: 'invaliddoctorid',
          date: new Date().toISOString().split('T')[0],
        })

      expect(response.status).toBe(404)
      expect(response.body.message).toBe('Doctor not found')
    })

    it('should return 404 if no availability on this date', async () => {
      const doctor = new Doctor({
        name: 'Dr. Smith',
        availability: [
          {
            date: new Date(),
            slots: [{ time: '10:00 AM', available: true }],
          },
        ],
      })
      await doctor.save()

      const response = await request(app)
        .get('/api/appointments/availability')
        .query({ doctorId: doctor._id, date: '2099-01-01' })

      expect(response.status).toBe(404)
      expect(response.body.message).toBe('No availability on this date')
    })
  })

  describe('cancelAppointment', () => {
    it('should cancel an appointment successfully', async () => {
      const doctor = new Doctor({
        name: 'Dr. Smith',
        availability: [
          {
            date: new Date(),
            slots: [{ time: '10:00 AM', available: false }],
          },
        ],
      })
      await doctor.save()

      const appointment = new Appointment({
        doctorId: doctor._id,
        patientName: 'John Doe',
        date: new Date(),
        time: '10:00 AM',
        symptoms: 'Fever',
      })
      await appointment.save()

      sandbox.stub(sendNotification, 'sendNotification').resolves()

      const response = await request(app)
        .delete('/api/appointments/cancel')
        .send({
          appointmentId: appointment._id,
          contactInfo: 'john@example.com',
          notificationType: 'email',
        })

      expect(response.status).toBe(200)
      expect(response.body.message).toBe('Appointment cancelled successfully')

      const updatedDoctor = await Doctor.findById(doctor._id)
      const availability = updatedDoctor.availability.find(
        (a) =>
          a.date.toISOString().split('T')[0] ===
          new Date().toISOString().split('T')[0],
      )
      const slot = availability.slots.find((s) => s.time === '10:00 AM')
      expect(slot.available).toBe(true)
    })

    it('should return 404 if appointment is not found', async () => {
      const response = await request(app)
        .delete('/api/appointments/cancel')
        .send({
          appointmentId: 'invalidappointmentid',
          contactInfo: 'john@example.com',
          notificationType: 'email',
        })

      expect(response.status).toBe(404)
      expect(response.body.message).toBe('Appointment not found')
    })
  })
})
