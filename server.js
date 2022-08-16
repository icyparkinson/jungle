// MODULES
const express = require('express'); 
const app = express(); 
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient; 
const ejs = require ('ejs');
const ItemsList = require('./models/ItemsList');
const CartsList = require('./models/CartsList');
const { response } = require('express');
const { Decimal128 } = require('mongodb');
const PORT = 4444; 
require('dotenv').config(); 


// MIDDLEWARE
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


// NOT FOUND PAGE
app.get('/nothing', async (req, res) => {

  let groupStage = { $group: { 
    _id: null, 
    total: { 
        $sum: "$itemCount"
    } 
} 
}
  let cartCount = await CartsList.aggregate([groupStage])
  let cartNum = (cartCount.map(a => a.total))[0] 


    res.render('items/nothing', {
      shoppingCart: cartNum
    })
})


//ADDING ITEM TO CART
app.post('/addItem', async (req, res) => {
  try{
    await CartsList.create({
      itemName: req.body.itemName, 
      itemPrice: req.body.itemPrice,
      itemCount: req.body.itemCount,
      itemPic: req.body.itemPic,
      itemPage: req.body.itemPage,
    
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

// DELETING ITEM IN CART
app.delete('/deleteItem', async(req, res) => {
  try{
    await CartsList.findOneAndDelete({
      itemName: req.body.itemName
    })
    
    res.redirect("/cart")

  }catch(err){
    console.log(err)
  }

})

// EMPTYING CART
app.delete('/emptyCart', async(req, res) => {
  try{
    await CartsList.deleteMany({
      //empty filter here will catch everything
    })
    
    res.redirect("/cart")

  }catch(err){
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

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
