const dotenv = require('dotenv')

if(process.env.NODE_ENV == 'development') {
  dotenv.config()
}

const corsClient = {
  // Development
  domain: 'http://localhost:8080'
}

const sessionDB = {
  host: process.env.SESSION_DB_HOST,
  user: process.env.SESSION_DB_USER,
  pass: process.env.SESSION_DB_PASS,
  port: process.env.SESSION_DB_PORT,
  name: process.env.SESSION_DB_NAME,
  secret: process.env.SESSION_DB_SECRET
}

const twilioConfig = {
  accountSid: 'ACd7eecee8e62a590ecfc4a315c61035dd',
  authToken: '1bfe610492763ab9021ec749f8ec0bfc',
  apiKey: 'SKee4ac197d9cbdbbf6c2abc535e00c3b4',
  apiSecret: 'M4n9py3FEzihDoZYtJIcAiT9aqndMQNW'
}

const port = process.env.PORT || '8080'

module.exports = {
  corsClient, 
  port, 
  sessionDB, 
  twilioConfig 
}