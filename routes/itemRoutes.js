const express = require('express')
const itemController = require ('../controllers/itemController')
const router = express.Router()

//ADDING ITEM TO CART
router.post('/addItem', itemController.addItem)
  
//UPDATING ITEM IN CART
router.put('/updateItem', itemController.updateItem)
  
//DELETING ITEM IN CART
router.delete('/deleteItem', itemController.deleteItem)
  
// EMPTYING CART
router.delete('/emptyCart', itemController.emptyCart)

module.exports = router