const express = require("express")
const app = express()
const PORT = 3005
const mongoose = require('mongoose')
const cors = require ("cors")


//Middleware
app.use(express.json());

//CORS (add CORS after you start working on the front end)

const whitelist = ['http://localhost:3000', 'https://fathomless-sierra-68956.herokuapp.com']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors()) 

// Note: all routes are now exposed. If you want to limit access for specific verbs like POST or DELETE you can look at the npm documentaion for cors (for example with OMDB - it's ok for anyone to see the movies, but you don't want just anyone adding a movie)


mongoose.connection.on('error', err => console.log(err.message + ' is Mongo not running?'))
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))

//update this to match mongoose database
mongoose.connect('mongodb+srv://mfarid:metallica@sei.mfupj.azure.mongodb.net/bookmarks-moefarid?retryWrites=true&w=majority', { useNewUrlParser: true })

mongoose.connection.once('open', ()=>{
    console.log('connected to mongoose...')
})



app.listen(PORT, () => {
    console.log("congrats, you are on", PORT)
})

const bookmarksController = require('./controllers/bookmarks.js')

app.use('/bookmarks', bookmarksController)