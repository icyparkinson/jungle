const CartsList = require('../models/CartsList');

//ADDING ITEM TO CART
const addItem = async (req, res) => {
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
}

//UPDATING ITEM IN CART
const updateItem = async (req, res) => {
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
}

//DELETING ITEM IN CART
const deleteItem = async (req, res) =>{
    try{
      await CartsList.findOneAndDelete({
        itemName: req.body.itemName
      })
      
      res.redirect("/cart")
  
    }catch(err){
      console.log(err)
    }
}

//EMPTYING CART
const emptyCart = async (req, res) => {
    try{
        await CartsList.deleteMany({
          //empty filter here will catch everything
        })
        
        res.redirect("/cart")
    
      }catch(err){
        console.log(err)
      }
}

module.exports = {
    addItem,
    updateItem,
    deleteItem,
    emptyCart
}