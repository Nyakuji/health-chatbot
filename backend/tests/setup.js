const mongoose = require('mongoose')
const chai = require('chai')
const { MongoMemoryServer } = require('mongodb-memory-server')
const { beforeAll, afterAll, afterEach } = require('@jest/globals')
require('dotenv').config()

chai.should()

let mongoServer

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  const mongoUri = mongoServer.getUri()
  await mongoose.connect(mongoUri)
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})

afterEach(async () => {
  const collections = mongoose.connection.collections

  for (const key in collections) {
    const collection = collections[key]
    await collection.deleteMany({})
  }
})

module.exports = chai