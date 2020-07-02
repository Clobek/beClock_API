require('custom-env').env(true);
const express = require('express')
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const PORT = process.env.PORT
const User = require('./models/users.js')
const unirest = require("unirest");
const jwt = require('jsonwebtoken')
const alarmController = require('./controllers/alarms.js');
const SECRET = process.env.SECRET
const bcrypt = require('bcrypt')
const morgan = require('morgan')


// MONGO DATABASE
const db = mongoose.connection;
const dbConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
}

mongoose.connect(process.env.MONGODB_URI, dbConfig)

db.on('open', () => {
    console.log('connected to mongo')
})

db.on('error', (err) => {
    console.log(err)
})

//MIDDLEWARE
app.use(morgan('combined'))
app.use(cors());
app.use(express.json())
app.use('/alarms/', alarmController);

//Sign up Route\\
app.post('/signup', (req, res)=>{
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.create(req.body, (error, createdUser)=>{
  })
})

//Login Route\\
app.post('/login', (req, res) => {
  User.findOne({username: req.body.username}, (error, foundUser)=>{
    if(bcrypt.compareSync(req.body.password, foundUser.password)){
          const token = jwt.sign({username: foundUser.username}, SECRET);
          res.status(200).json(token);
    } else {
          res.status(400).send('Wrong Username or Password')
    }    
  })
})

// AUTHORIZATION MIDDLEWARE
const auth = async (req, res, next) => {
  try {
  const {authorization} = req.headers;
  if (authorization) {
          const token = authorization.split(' ')[1];
          const result = jwt.verify(token, SECRET)
          req.user = result;
          next();
  } else {
          res.send('NO TOKEN')
  }}
  catch(error) {
    res.send(error)
  }
}

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
