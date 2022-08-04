const express = require('express')
const router = express.Router()
const itemsController = require('../controllers/items') 
// const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', itemsController.getItem)

module.exports = router