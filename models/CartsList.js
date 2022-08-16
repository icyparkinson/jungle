
const mongoose = require('mongoose')
const { Decimal128 } = require('mongodb');


const CartSchema = new mongoose.Schema({
    itemName: String,
    itemCount: Decimal128,
    itemPrice: String,
    itemPic: String,
    itemPage: String,
})


module.exports = mongoose.model("cart", CartSchema) 