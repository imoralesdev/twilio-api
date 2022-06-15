const { Router } = require('express')
const authRouter = require('./auth.js')
const conversationRouter = require('./conversations.js')
const pagesRouter = require('./pages.js')

const router = Router()

router.use('/test', (req, res) => {
  res.send('Twilio API Working...')
})

router.use('/', pagesRouter)
router.use('/auth/token', authRouter)
router.use('/api/conversations', conversationRouter)

module.exports = router