const GetToken = (req, res, next) => {
  console.log(req.session)
  console.log(req.session.token)
  console.log(req.session.conversationUsername)
  if(req.session.token) {
    res.send({ 
      token: req.session.token, 
      username: req.session.conversationUsername 
    })
  } 
  else {
    next({ 
      status: 404, 
      message: 'Token not set' 
    })
  }
}

module.exports = { GetToken }