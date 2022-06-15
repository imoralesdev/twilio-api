const { Router } = require('express')

const router = Router()

router.get('/', (req, res) => {
  res.render("pages/home", {
    template: "home",
    title: "Example Web Page | Home"
  })
})

router.get('/conversation', (req, res) => {
  res.render("pages/conversation", {
    template: "conversation",
    title: "Example Web Page | Conversation"
  })
})

router.get('/error', (req, res) => {
  res.render("pages/error", {
    template: "error",
    title: "Example Web Page | Error Conversation"
  })
})

router.get('/chat', (req, res) => {
  res.render("pages/chat", {
    template: "chat",
    title: "Example Web Page | Conversation"
  })
})

router.get('/login', (req, res) => {
  res.render("pages/login", {
    template: "login",
    title: "Example Web Page | Enter to Conversation"
  })
})

module.exports = router