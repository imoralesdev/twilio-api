const DeleteToken = (req, res, next) => {
  delete req.session.token;
  delete req.session.username;
  
  res.send({ message: 'Session destroyed' });
}

module.exports = { DeleteToken }