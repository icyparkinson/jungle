const mongoose = require('mongoose')


const ItemSchema = new mongoose.Schema({
  itemName: String,
  itemListPrice: String,
  itemDealPrice: String,
  itemPage: String,
  itemPic: String,
  itemDesc: Array,
})


module.exports = mongoose.model("item", ItemSchema) //the "item" here connects with mongooseDB's name of the collection. MongoDB will automatically make this plural and create a new collection if it doesn't already exist.