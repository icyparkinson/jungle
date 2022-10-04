const ItemsList = require('../models/ItemsList');
const CartsList = require('../models/CartsList');

//REUSABLE VARIABLES
let groupStage = { $group: { 
    _id: null, 
    total: { 
        $sum: "$itemCount"
    } 
} }

//HOMEPAGE
const homePage = async (req, res) => {
    let clowns = await ItemsList.find()
    
    //cartCount returns an array with an object inside with 2 properties: id and total)
    let cartCount = await CartsList.aggregate([groupStage]) //This aggregate function is from MongoDB and lets you sum everything up from one query type
    let cartNum = (cartCount.map(a => a.total))[0] //have to use Map to get the number out of the object inside an array
  
    res.render('index', {
      baloons: clowns, //What follows the colon is the actual database array. What precedes the colon is the variable used by EJS.
      shoppingCart: cartNum
    })
}

//ANY ITEM PAGE
const itemPage = async(req, res) => {
    let id = req.params.id
    let foundItem = await ItemsList.findById(id)
  
  let cartCount = await CartsList.aggregate([groupStage])
    let cartNum = (cartCount.map(a => a.total))[0]
  
    await CartsList.find({"itemName" : foundItem.itemName}) === undefined ? inCart = [] : inCart = await CartsList.find({"itemName" : foundItem.itemName})
    
    res.render('items', {
      item: foundItem,
      shoppingCart: cartNum,
      cartItem: inCart
    })
}

// NOT FOUND PAGE
const notFound = async(req,res) =>{
    let cartCount = await CartsList.aggregate([groupStage])
    let cartNum = (cartCount.map(a => a.total))[0] 
  
      res.render('nothing', {
        shoppingCart: cartNum
      })
}

// SHOPPING CART PAGE
const shoppingCart = async(req,res) => {
    let cart = await CartsList.find()
  
    let cartCount = await CartsList.aggregate([groupStage])
    let cartNum = (cartCount.map(a => a.total))[0]
  
  
    res.render('cart', {
      currentCart : cart,
      shoppingCart: cartNum
    })
}

module.exports = {
    homePage,
    itemPage,
    notFound,
    shoppingCart
}