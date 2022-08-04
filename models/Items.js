const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('Items', ItemSchema)
