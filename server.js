// MODULES
const express = require('express'); 
const app = express(); 
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient; 
const ejs = require ('ejs');
const Items = require('./models/Items');
const { response } = require('express');
const { Decimal128 } = require('mongodb');
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
  itemListPrice: String,
  itemDealPrice: String,
  itemPage: String,
  itemPic: String,
  itemDesc: Array,
}

const ItemsList = mongoose.model('item', itemSchema)

const cartSchema = {
  itemName: String,
  itemCount: Decimal128,
  itemPrice: String,
}

const CartsList = mongoose.model('cart', cartSchema)

//HOMEPAGE
app.get('/', async (req, res) =>{
  let clowns = await ItemsList.find()
  // let cart = await CartsList.countDocuments() <-- turns out, I don't need this
  let groupStage = { $group: { 
    _id: null, 
    total: { 
        $sum: "$itemCount"
    } 
} 
}
  let cartCount = await CartsList.aggregate([groupStage]) //This aggregate function is from MongoDB and lets you sum everything up from one query type
  let cartNum = (cartCount.map(a => a.total))[0] //have to use Map to get the number out of the object inside an array

  res.render('index', {
    baloons: clowns, //What follows the colon is the actual database array. What precedes the colon is the variable used by EJS.
    shoppingCart: cartNum
  })
  
})

//TOY PAGE
app.get('/toy1', async (req, res) => {
  let bears = await ItemsList.find({"_id" : "62e726b7da400130d185a46b"})

  let groupStage = { $group: { 
    _id: null, 
    total: { 
        $sum: "$itemCount"
    } 
} 
}
  let cartCount = await CartsList.aggregate([groupStage]) //This aggregate function is from MongoDB and lets you sum everything up from one query type
  let cartNum = (cartCount.map(a => a.total))[0] //have to use Map to get the number out of the object inside an array

  //When this doesn't find anything, it errors out since it becomes undefined. So we use a ternary here to catch this moment.
  await CartsList.find({"itemName" : "Toy"}) === undefined ? inCart = [] : inCart = await CartsList.find({"itemName" : "Toy"})

    res.render('items/toy1', {
      taxi: bears,
      shoppingCart: cartNum,
      cartItem: inCart
    })
})


//WATCH PAGE
app.get('/watch1', async (req, res) => {
  let bears = await ItemsList.find({"_id" : "62ec4820d159dab74abf793a"})

  let groupStage = { $group: { 
    _id: null, 
    total: { 
        $sum: "$itemCount"
    } 
} 
}
  let cartCount = await CartsList.aggregate([groupStage])
  let cartNum = (cartCount.map(a => a.total))[0]

  await CartsList.find({"itemName" : "Watch"}) === undefined ? inCart = [] : inCart = await CartsList.find({"itemName" : "Watch"})

    res.render('items/watch1', {
      taxi: bears,
      shoppingCart: cartNum,
      cartItem: inCart
    })
})


//FOOD PAGE
app.get('/food1', async (req, res) => {
  let bears = await ItemsList.find({"_id" : "62ec50a5d159dab74abf793b"})

  let groupStage = { $group: { 
    _id: null, 
    total: { 
        $sum: "$itemCount"
    } 
} 
}
  let cartCount = await CartsList.aggregate([groupStage]) 
  let cartNum = (cartCount.map(a => a.total))[0] 

  await CartsList.find({"itemName" : "Food"}) === undefined ? inCart = [] : inCart = await CartsList.find({"itemName" : "Food"})

    res.render('items/food1', {
      taxi: bears,
      shoppingCart: cartNum,
      cartItem: inCart
    })
})


//CLOTHES PAGE
app.get('/clothes1', async (req, res) => {
  let bears = await ItemsList.find({"_id" : "62ec50eed159dab74abf793c"})

  let groupStage = { $group: { 
    _id: null, 
    total: { 
        $sum: "$itemCount"
    } 
} 
}
  let cartCount = await CartsList.aggregate([groupStage])
  let cartNum = (cartCount.map(a => a.total))[0] 

  await CartsList.find({"itemName" : "Clothes"}) === undefined ? inCart = [] : inCart = await CartsList.find({"itemName" : "Clothes"})

    res.render('items/clothes1', {
      taxi: bears, 
      shoppingCart: cartNum,
      cartItem: inCart
    })
})


//ADDING ITEM TO CART
app.post('/addItem', async (req, res) => {
  try{
    await CartsList.create({
      itemName: req.body.itemName, 
      itemPrice: req.body.itemPrice,
      itemCount: req.body.itemCount
    
    })
    
    res.redirect("/cart")

  } catch(err){
    console.log(err)
  }
})

//UPDATING ITEM IN CART
app.put('/updateItem', async (req, res) => {
  try{
    await CartsList.findOneAndUpdate(
      { itemName: req.body.itemName }, 
      { 
        $set:{
          "itemCount": req.body.itemQty
        }
      }
      )
    
    res.redirect("/cart")

  } catch(err){
    console.log(err)
  }
})





// SHOPPING CART PAGE
app.get('/cart', async (req, res) => {
  let cart = await CartsList.find()

  let groupStage = { $group: { 
    _id: null, 
    total: { 
        $sum: "$itemCount"
    } 
} 
}
  let cartCount = await CartsList.aggregate([groupStage]) //This aggregate function is from MongoDB and lets you sum everything up from one query type
  let cartNum = (cartCount.map(a => a.total))[0] //have to use Map to get the number out of the object inside an array


  res.render('cart', {
    currentCart : cart,
    shoppingCart: cartNum
  })
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
