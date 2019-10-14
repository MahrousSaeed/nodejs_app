const express = require('express');
const router = express.Router()
const adminController = require('../controllers/admin')

router.get('/admin/products',adminController.getAdminProducts)

router.get('/admin/add-product',adminController.getAddproduct)

router.get('/admin/edit-product/:id',adminController.getEditProduct)

router.post('/edit-product',adminController.postEditProduct)

router.post('/admin/delete-product/:id',adminController.deleteProduct)

router.post('/product',adminController.postAddproduct)

module.exports = router
