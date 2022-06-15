const { Router } = require('express')
const { AddParticipant } = require('../controllers/conversations/AddParticipant.js')
const { StartConversation } = require('../controllers/conversations/StartConversation.js')
const { asyncWrapper } = require('../utils/controller.js')

const router = Router()

router.post('/', asyncWrapper(StartConversation))
router.post('/:id/participants', asyncWrapper(AddParticipant))

module.exports = router