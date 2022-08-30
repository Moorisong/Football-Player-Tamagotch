const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const register = require('./routes/register')
const logIn = require('./routes/logIn')
const auth = require('./routes/auth')
const logOut = require('./routes/logOut')
const cookieParser = require('cookie-parser')
const cors = require('cors')

app.use(cookieParser())

const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
};

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors(corsOptions))
app.use('/', register)
app.use('/', logIn)
app.use('/', auth)
app.use('/', logOut)


app.listen(3001, () => {
  console.log('connected port:3001')
  mongoose
    .connect(
      'mongodb+srv://ksh:ksh@songcluster.hgpfq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    )
    .then(() => {
      console.log('mongoDB connected!')
    })
    .catch(err => {
      console.log('error--->', err)
    })
})
