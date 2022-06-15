const twilio = require('twilio')
const { twilioConfig } = require('../../config/index.js')
const { createToken } = require('../../utils/token.js')

const StartConversation = async (req, res, next) => {
  // console.log(req.body)
  const client = twilio(twilioConfig.accountSid, twilioConfig.authToken)
  
  const { conversationTitle, conversationUsername } = req.body
  
  try {
    if(conversationTitle && conversationUsername) {
      // Create Conversation on Twilio
      const conversation = await client.conversations.conversations
        .create({ friendlyName: conversationTitle })

      // Set Session to Browser
      req.session.token = createToken(conversationUsername, conversation.chatServiceSid)
      req.session.conversationUsername = conversationUsername

      // Add User to Conversation
      const participant = await client.conversations.conversations(conversation.sid)
        .participants.create({ identity: conversationUsername })
      
      res.send({ conversation, participant })
    } 
    else {
      next({ message: 'Missing conversation title or username' })
    }
  }
  catch(error) {
    next({ error, message: 'There was a problem creating your conversation' })
  }
}

module.exports = { StartConversation }