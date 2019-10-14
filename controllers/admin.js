const Product = require('../models/product')
const CartModel = require('../models/cart')
const fs = require('fs')
const path = require('path')
const filePath = path.join(path.dirname(process.mainModule.filename),
   'data',
   'products.json'
)

// form to add new product
exports.getAddproduct = (req, res, next) => {
   res.render('admin/edit-product', {
      docTitle: "add product",
      path: 'admin/add-product',
      editing: false
   });
}

exports.getEditProduct = (req, res, next) => {
   // admin/edit-product/0.215454?edit=true&title=page
   const editMode = req.query.edit
   if (!editMode) {
      return res.redirect('/')
   }
   const productId = req.params.id
   // console.log('productId',productId);
   
   const proucts = new Product('')
   proucts.findById(productId, product => {
      res.render('admin/edit-product', {
         docTitle: "Edit product",
         path: 'admin/edit-product',
         editing: editMode,
         product: product
      });
      // console.log(product);
   })
   
   
}
exports.postEditProduct = (req, res, next) => {
   // admin/edit-product/0.215454?edit=true&title=page
   const productId = req.body.productId
   const product = new Product(req.body.productId,
      req.body.title,
      req.body.imageUrl,
      req.body.description,
      req.body.price)
      product.save()
      res.redirect('/admin/products')
}
// return all products for admin to delete or edit 
exports.getAdminProducts = (req, res, next) => {
   const product = new Product('')
   let products = product.fetchAll((products) => {
      // do this callback after return data form the file 
      res.render('admin/adminProducts', { docTitle: 'admin products', prods: products })
   })

}
// when post a new product
exports.postAddproduct = (req, res, next) => {
   // console.log('req.body',req.body);
   const title = req.body.title
   const imageUrl = req.body.imageUrl
   const description = req.body.description
   const price = req.body.price
   const product = new Product(null,title, imageUrl, description, price)
   product.save()
   res.redirect('/')
}
exports.deleteProduct = (req, res, next) => {
   console.log(req.params.id);
   const productModel = new Product()
   productModel.fetchAll(products => {
      const editedProductIndex = products.findIndex(i => i.id === req.params.id)
      const deletedItem = products[editedProductIndex]
      products.splice(editedProductIndex,1)
      console.log('products',products);
      fs.writeFile(filePath,JSON.stringify(products),(err) => {
         console.log(err);
      })
      // delete from cart
      CartModel.deleteProduct(deletedItem.id,deletedItem.price)
      res.redirect('/admin/products')
      
   }) 

}


