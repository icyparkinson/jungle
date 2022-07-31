const express = require("express")
const app = express()
const mongoose = require('mongoose')
// const MongoClient = require("mongodb").MongoClient
const { response } = require("express")
const passport = require("passport")
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
require ("dotenv").config()
const PORT = 8000
// const mainRoutes = require('./routes/main')
// const animeRoutes = require('./routes/animes')

// Passport config
require('./config/passport')(passport)

connectDB()


app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(logger('dev'))



// Sessions
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
)
    
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())


app.use(flash())

app.use('/', mainRoutes)
app.use('/items', itemRoutes)


app.listen(process.env.PORT || PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})