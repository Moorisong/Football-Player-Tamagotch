const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()

const register = require('./routes/register')
const logIn = require('./routes/logIn')
const auth = require('./routes/auth')
const logOut = require('./routes/logOut')
const main = require('./routes/main')
const makeNewPlayer = require('./routes/makeNewPlayer')
const training = require('./routes/training')
const competition = require('./routes/competition')
const giveKiss = require('./routes/giveKiss')
const registerLegend = require('./routes/registerLegend')



const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
};

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors(corsOptions))

app.use('/', register)
app.use('/', logIn)
app.use('/', auth)
app.use('/', logOut)
app.use('/', main)
app.use('/', makeNewPlayer)
app.use('/', training)
app.use('/', competition)
app.use('/', giveKiss)
app.use('/', registerLegend)


app.listen(3001, () => {
  console.log('connected port:3001')
  mongoose
    .connect(
      'mongodb+srv://ksh:ksh@songcluster.hgpfq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
      // 'mongodb://ksh:ksh@songcluster-shard-00-00.hgpfq.mongodb.net:27017,songcluster-shard-00-01.hgpfq.mongodb.net:27017,songcluster-shard-00-02.hgpfq.mongodb.net:27017/?ssl=true&replicaSet=atlas-12y8wq-shard-0&authSource=admin&retryWrites=true&w=majority'
    )
    .then(() => {
      console.log('mongoDB connected!')
    })
    .catch(err => {
      return console.log('error--->', err)
    })
})
