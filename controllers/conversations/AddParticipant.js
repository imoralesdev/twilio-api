const twilio = require('twilio')
const { twilioConfig } = require('../../config/index.js')
const { createToken } = require('../../utils/token.js')

const AddParticipant = async (req, res, next) => {
  const client = twilio(twilioConfig.accountSid, twilioConfig.authToken)
    
  const { username } = req.body
  const conversationSid = req.params.id
    
  try {
    const conversation = await client.conversations.conversations
      .get(conversationSid).fetch()
    
    if(username && conversationSid) {
      req.session.token = createToken(username, conversation.chatServiceSid)
      req.session.username = username
        
      const participant = await client.conversations.conversations(conversationSid)
        .participants.create({ identity: username })
      
      res.send({ conversation, participant })
    } 
    else {
      next({ message: 'Missing username or conversation Sid' })
    }
  } 
  catch(error) {
    next({ error, message: 'There was a problem adding a participant' })
  }
}

module.exports = { AddParticipant }