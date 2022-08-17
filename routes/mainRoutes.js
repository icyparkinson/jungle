const express = require('express')
const mainController = require ('../controllers/mainController')
const router = express.Router()

//HOMEPAGE
router.get('/', mainController.homePage)
  
//ANY ITEM PAGE
router.get('/items/:id', mainController.itemPage)
  
// NOT FOUND PAGE
router.get('/nothing', mainController.notFound)
  
// SHOPPING CART PAGE
router.get('/cart', mainController.shoppingCart)


module.exports = router