// MODULES
const express = require('express'); 
const app = express(); 
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient; 
const ejs = require ('ejs');
const ItemsList = require('./models/ItemsList');
const CartsList = require('./models/CartsList');
const { response } = require('express');
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

//ANY ITEM PAGE
app.get('/items/:id', async (req, res) =>{
  let id = req.params.id
  let foundItem = await ItemsList.findById(id)

  let groupStage = { $group: { 
    _id: null, 
    total: { 
        $sum: "$itemCount"
    } 
} 
}

let cartCount = await CartsList.aggregate([groupStage]) //This aggregate function is from MongoDB and lets you sum everything up from one query type
  let cartNum = (cartCount.map(a => a.total))[0] //have to use Map to get the number out of the object inside an array

  await CartsList.find({"itemName" : foundItem.itemName}) === undefined ? inCart = [] : inCart = await CartsList.find({"itemName" : foundItem.itemName})
  
  res.render('items', {
    item: foundItem,
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


    res.render('nothing', {
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
