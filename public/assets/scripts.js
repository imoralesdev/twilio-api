// State App Manager
window.twilioChat = window.twilioChat || {};

/*
 * Create Conversation
**/
const createConversation = function(event) {
  event.preventDefault()
  
  let startConversationForm = document.getElementById('start_conversation')
  
  let conversationFormData = new FormData(startConversationForm)
  
  let conversationFormBody = Object.fromEntries(conversationFormData.entries()) || {}

  let conversationSubmitBtn = document.getElementById('submit_conversation')
  conversationSubmitBtn.innerText = 'Creating conversation...'
  conversationSubmitBtn.disable = true
  conversationSubmitBtn.style.cursor = 'wait'

  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(conversationFormBody),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  
  fetch('https://twilio-api.imoralesdev.repl.co/api/conversations', requestOptions)
    .then(() => {
      window.twilioChat.username = conversationFormBody.conversationUsername;
      location.href = '/chat'
    })
    .catch(() => {
      location.href = '/error'
    });
}

/*
 * Add Messages to Chat Area
**/
const addMessagesToChatArea = function(messages, clearMessage) {
  let 
    conversation, 
    msgConversation,
    msgAuthor,
    msgTimestamp

  const chatArea = document.getElementById('chat_area')

  if(clearMassage) {
    console.log('Clear Message')
  }
}

/*
 * Set Conversation
**/
const setConversation = async function(sid, name) {
  console.log(sid, name)
  try {
    // If click a selected conversation
    window.twilioChat.selectedConversationSid = sid
    document.getElementById('chat-title').innerText = `+ ${name}`
    window.twilioChat.selectedConversation = await window.twilioChat.client.getConversationBySid(window.twilioChat.selectedConversationSid)

    // Extracting message from conversation
    const messages = await window.twilioChat.selectedConversation.getMessages()
    
  }
  catch {
    console.log('Error on Set Conversation')
  }
}

/*
 * Init Client for Conversation
**/
const initClientChat = async function() {
  sessionStorage.setItem("token", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2VlNGFjMTk3ZDljYmRiYmY2YzJhYmM1MzVlMDBjM2I0LTE2NTUzMjQ2ODkiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJqb2huMTIzIiwiY2hhdCI6eyJzZXJ2aWNlX3NpZCI6IklTNzU5YWI3M2I1ODkxNGQ5NGE4MTY3NTdiNTkxYjBhMmYifX0sImlhdCI6MTY1NTMyNDY4OSwiZXhwIjoxNjU1MzI4Mjg5LCJpc3MiOiJTS2VlNGFjMTk3ZDljYmRiYmY2YzJhYmM1MzVlMDBjM2I0Iiwic3ViIjoiQUNkN2VlY2VlOGU2MmE1OTBlY2ZjNGEzMTVjNjEwMzVkZCJ9.Uqv7WCIYYe9lVAPquqL6XGIZB7omu6RPPnmZewyQ0uA')
  sessionStorage.setItem("conversationUsername", 'john123')
  
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  
  try {
    // Get token based on session browser data
    const response = await fetch('https://twilio-api.imoralesdev.repl.co/auth/token', requestOptions)
    const data = await response.json()

    // Set data on state app manager
    window.twilioChat.username = /*data.username*/ 'john123'
    window.twilioChat.client = await window.Twilio.Conversations.Client.create(/*data.token*/ 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2VlNGFjMTk3ZDljYmRiYmY2YzJhYmM1MzVlMDBjM2I0LTE2NTUzMjQ2ODkiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJqb2huMTIzIiwiY2hhdCI6eyJzZXJ2aWNlX3NpZCI6IklTNzU5YWI3M2I1ODkxNGQ5NGE4MTY3NTdiNTkxYjBhMmYifX0sImlhdCI6MTY1NTMyNDY4OSwiZXhwIjoxNjU1MzI4Mjg5LCJpc3MiOiJTS2VlNGFjMTk3ZDljYmRiYmY2YzJhYmM1MzVlMDBjM2I0Iiwic3ViIjoiQUNkN2VlY2VlOGU2MmE1OTBlY2ZjNGEzMTVjNjEwMzVkZCJ9.Uqv7WCIYYe9lVAPquqL6XGIZB7omu6RPPnmZewyQ0uA') // Creating client for Twilio

    // Pulling conversation data from Twilio based on session token
    let conversations = await window.twilioChat.client.getSubscribedConversations()
    console.log(conversations)
    
    let conversationSideNav = document.getElementById('conversation-list')
    
    let conversationElement, conversationName

    for(let conv of conversations.items) {
      conversationElement = document.createElement('button')
      conversationElement.classList.add('conversation')
      conversationElement.id = conv.sid
      conversationElement.value = conv.sid
      conversationElement.onclick = async () => {
        await setConversation(
          conv.sid,
          conv.channelState.friendlyName
        )
      }

      conversationName = document.createElement('h3')
      conversationName.innerText = `💬 ${conv.channelState.friendlyName}`

      conversationElement.appendChild(conversationName)

      conversationSideNav.appendChild(conversationElement)
    }
  }
  catch {
    console.log('error')
    //location.href = '/error'
  }
}

/*
 * Load App
**/
document.addEventListener("DOMContentLoaded", function() {
  switch(document.body.dataset.template) {
    case 'home':
      console.log('Page Home')
      break
    case 'conversation':
      console.log('Page Conversation')
      let conversationSubmitBtn = document.getElementById('submit_conversation')
      
      if(conversationSubmitBtn != null) {
        conversationSubmitBtn.addEventListener('click', createConversation, false);
      }
      break
    case 'chat':
      console.log('Page Chat')
      initClientChat()
      
      break
    case 'error':
      console.log('Page Error')
      break
  }
})