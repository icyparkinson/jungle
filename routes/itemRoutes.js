const express = require('express')
const ItemsList = require('../models/ItemsList');
const CartsList = require('../models/CartsList');
const router = express.Router()

//ADDING ITEM TO CART
router.post('/addItem', async (req, res) => {
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
router.put('/updateItem', async (req, res) => {
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
router.delete('/deleteItem', async(req, res) => {
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
router.delete('/emptyCart', async(req, res) => {
    try{
      await CartsList.deleteMany({
        //empty filter here will catch everything
      })
      
      res.redirect("/cart")
  
    }catch(err){
      console.log(err)
    }
  
  })

module.exports = router