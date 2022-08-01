// MODULES
const express = require('express'); 
const app = express(); 
const MongoClient = require('mongodb').MongoClient; 
const PORT = 4444; 
require('dotenv').config(); 

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
app.get('/', async (request, response) => {
//   const boughtItems = await db.collection('jungle').find().toArray(); 
//   const cartCount = await db 
//     .collection('jungle') 
//     .countDocuments(); 
  response.render('index.ejs'); 
});

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
