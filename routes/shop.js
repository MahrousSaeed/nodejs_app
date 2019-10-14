const express = require('express');
const router = express.Router()
const adminData = require('./admin')
const shopController = require('../controllers/shop')
// const path = require('path')
  
// router.get('/',shopController.getProducts)
router.get('/products',shopController.getAllProducts)
router.get('/products/:id',shopController.getOneProduct)

router.get('/cart',shopController.getCart)
router.post('/cart',shopController.postCart)
router.post('/cart/delete-item',shopController.deleteItem)

router.get('/orders',shopController.orders)
router.get('/',shopController.index)
router.get('/checkout',shopController.checkout)
module.exports = router