const twilio = require('twilio')
const { twilioConfig } = require('../config/index.js')

const createToken = (username, serviceSid) => {
  const AccessToken = twilio.jwt.AccessToken
  const ChatGrant = AccessToken.ChatGrant

  const token = new AccessToken(
    // Twilio Account Sid
    twilioConfig.accountSid,
    // Twilio API Key
    twilioConfig.apiKey,
    // Twilio API Key Secret
    twilioConfig.apiSecret,
    // Username
    {
      identity: username
    }
  )

  const chatGrant = new ChatGrant({
    serviceSid: serviceSid
  })

  token.addGrant(chatGrant)

  return token.toJwt()
}

module.exports = { createToken }