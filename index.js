const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

app.get('/', (req, res) => {

  console.log(req)

res.json({message: 'Oi Express!'})

})

// mongodb+srv://cissamalheiros:senha123@apicluster.jaowm.mongodb.net/?retryWrites=true&w=majority&appName=APICluster

const DB_USER = 'cissamalheiros'
const DB_PASSWORD =encodeURIComponent('senha123')

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.jaowm.mongodb.net/?retryWrites=true&w=majority&appName=APICluster`
  )
  .then(() => {
    console.log('Conectamos ao MongoDB!')
    app.listen(3000)
  })
  .catch((err) => console.log(err))

