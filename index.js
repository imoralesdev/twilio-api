const cors = require('cors')
const createError = require('http-errors')
const express = require('express')
const { json, urlencoded } = require('express')
const logger = require('morgan')
const session = require('express-session')
const store = require('connect-mongo')
const path = require("path");

const { corsClient, port } = require('./config/index.js')

const router = require('./routes/index.js')

const app = express()

app.use(logger('dev'))
app.use(json())
app.use(urlencoded({ extended: false }))

app.use(cors({
  origin: corsClient.domain,
  credentials: true,
  methods: ['GET', 'POST', 'DELETE'],
  maxAge: 3600 * 1000,
  allowedHeaders: ['Content-Type', 'Range'],
  exposedHeaders: ['Accept-Ranges', 'Content-Encoding', 'Content-Length', 'Content-Range']
}))

app.options('*', cors())

app.use(session({
  store: store.create({
    mongoUrl: `mongodb+srv://imoralesdev:15680295@twilio-api.j8ete5g.mongodb.net/?retryWrites=true&w=majority`,
    mongoOptions: { useUnifiedTopology: true },
    collectionName: 'twilio.sessions'
  }),
  secret: 'secret!session',
  cookie: {
    maxAge: 3600 * 1000,
    sameSite: 'strict'
  },
  name: 'twilio.sid',
  resave: false,
  saveUninitialized: true
}))

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "/public/")));

app.use('/', router)

app.use((_req, _res, next) => {
  next(createError(404, 'Route does not exist.'))
});

app.use((err, _req, res, _next) => {
  res.status(err.status || 500).send(err)
});

app.listen(port)