//MODULES
const express = require('express'); 
const app = express(); 
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient; 
const ejs = require ('ejs');
const mainRoutes = require('./routes/mainRoutes')
const itemRoutes = require('./routes/itemRoutes')
const PORT = 4444; 
require('dotenv').config(); 


//MIDDLEWARE
app.set('view engine', 'ejs'); 
app.use(express.static('public')); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

//CONNECT TO MONGODB
dbConnectionStr = process.env.DBStringJungle, 
mongoose.connect(dbConnectionStr, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(
  (client) => {
    console.log(`Connected to Database`); 
  }
);


//ROUTES
app.use(itemRoutes)
app.use(mainRoutes)


//LISTEN
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
