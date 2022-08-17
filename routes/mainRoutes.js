const express = require('express')
const ItemsList = require('../models/ItemsList');
const CartsList = require('../models/CartsList');
const router = express.Router()

//HOMEPAGE
router.get('/', async (req, res) =>{
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
  router.get('/items/:id', async (req, res) =>{
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
  router.get('/nothing', async (req, res) => {
  
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
  
  // SHOPPING CART PAGE
  router.get('/cart', async (req, res) => {
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

  module.exports = router