require('dotenv').config()
const path = require('path')
const express = require('express')
const cors = require('cors')
const app = express()
const usersRouter = require('./controllers/usersRouter')
const loginRouter = require('./controllers/loginRouter')
const corsRouter = require('./controllers/corsRouter')
const externalRouter = require('./controllers/externalRouter')
const mongoose = require('mongoose')

async function connectDB() {
  mongoose.connect(process.env.MONGODB)
    .then(() => {
      console.log('connected to MongoDB')
    })
    .catch((error) => {
      console.log('error connection to MongoDB:', error.message)
    })
}


app.use(express.static('build'))

app.use(express.json());

app.use('/api/cors', corsRouter);
app.use('/external', externalRouter);

// app.use(cors());

app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);


app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '/build/index.html'), function (err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

function unknownEndpoint(request, response, next) {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint);

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  })
})