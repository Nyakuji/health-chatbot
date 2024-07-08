const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const chai = require('chai')
const sinon = require('sinon')
const { beforeEach, afterEach, beforeAll, afterAll } = require('@jest/globals')

require('dotenv').config()

let mongoServer

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  const mongoUri = mongoServer.getUri()
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect()
  }
  await mongoose.connect(mongoUri)
})

afterAll(async () => {
  await mongoose.disconnect()
  if (mongoServer) {
    await mongoServer.stop()
  }
})

beforeEach(async () => {
  const collections = mongoose.connection.collections
  for (const key in collections) {
    await collections[key].deleteMany()
  }
})

afterEach(() => {
  sinon.restore()
})

chai.should()
