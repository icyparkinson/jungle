// MODULES
const express = require('express'); 
const app = express(); 
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient; 
const ejs = require ('ejs');
const Items = require('./models/Items');
const PORT = 4444; 
require('dotenv').config(); 

// const itemRoutes = require('./routes/items')




let db, 
  dbConnectionStr = process.env.DBStringJungle, 
  dbName = 'jungle'; 

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }).then(
  (client) => {
    console.log(`Connected to ${dbName} Database`); 
  }
);

// MIDDLEWARE
app.set('view engine', 'ejs'); 
app.use(express.static('public')); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());


// ROUTES
// app.use('/', itemRoutes)
// app.get('/', async (request, response) => {
//     let item = "Toy Story"
// //   const boughtItems = await db.collection('jungle').find().toArray(); 
// //   const cartCount = await db 
// //     .collection('jungle') 
// //     .countDocuments(); 
//   response.render('index', {
//     itemName: item
//   }); 
// });

mongoose.connect(dbConnectionStr)

const itemSchema = {
  itemName: String,
  itemPrice: String
}

const ItemsList = mongoose.model('item', itemSchema)


app.get('/', async (req, res) =>{
  // Items.find({}, function(err, items){
  //   res.render('index', {
  //     // itemsList: items
  //   })

  let clowns = await ItemsList.find()
  console.log(clowns)


  let name = "Icy"
  res.render('index', {
    userName: name,
    baloons: clowns //What follows the colon is the actual database array. What precedes the colon is the variable used by EJS.
  })
  
})

app.get('/toy1', async (request, response) => {
    response.render('items/toy1')
})

// app.post('/addItem', (request, response) => {
//   db.collection('jungle')
//     .insertOne({ thing: request.body.boughtItem }) 
//     .then((result) => {
//       console.log('Item Added'); 
//       response.redirect('/'); 
//     })
//     .catch((error) => console.error(error));
// });

// app.put('/changeQty', (request, response) => {
//   db.collection('jungle') 
//     .updateOne(
//       { thing: request.body.itemFromJS },
//       {
//         $set: {
//           quantity: 1,
//         },
//       },
//       {
//         upsert: false
//       }
//     )
//     .then((result) => {
//       console.log('Changed qty'); 
//       response.json('Changed qty'); 
//     })
//     .catch((error) => console.error(error)); 
// });



// app.delete('/deleteItem', (request, response) => {
//   db.collection('jungle')
//     .deleteOne({ thing: request.body.itemFromJS }) 
//     .then((result) => {
//       console.log('Item Deleted'); 
//       response.json('Item Deleted'); 
//     })
//     .catch((error) => console.error(error)); 
// });

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
