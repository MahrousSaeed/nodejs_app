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
   
   // const proucts = new Product('')
   Product.findByPk(productId)
   .then((product) => {      
      res.render('admin/edit-product', {
         docTitle: "Edit product",
         path: 'admin/edit-product',
         editing: editMode,
         product: product
      });
   })
   
   
}
exports.postEditProduct = (req, res, next) => {
   // admin/edit-product/0.215454?edit=true&title=page
   const productId = req.body.productId
   Product.findByPk(productId)
      .then((product) => {      
         product.title =  req.body.title;
         product.imageUrl =  req.body.imageUrl;
         product.description =  req.body.description;
         product.price =  Number(req.body.price);
         product.save()
         .then(()=>{
            console.log('Updated Done')
            res.redirect('/admin/products')
         })
      })
      .catch(err => console.log(err))
 
   res.redirect('/admin/products')
}
// return all products for admin to delete or edit 
exports.getAdminProducts = (req, res, next) => {
   // const product = new Product('')
   Product.findAll()
   .then((products) => {
      res.render('admin/adminProducts', { 
         docTitle: 'admin products',
          prods: products 
         })
   })
   .catch((err)=> {
      console.log(err);
      
   })

}
// when post a new product
exports.postAddproduct = (req, res, next) => {
   // console.log('req.body',req.body);
   const title = req.body.title
   const imageUrl = req.body.imageUrl
   const description = req.body.description
   const price = req.body.price
   Product.create({
     title:title,
     price:price,
     imageUrl:imageUrl,
     description:description
  }).then(result => {
      console.log('Created Done');
      // product.save()
  }).catch(err => {
     console.log(err);
  })
  res.redirect('/')
}
exports.deleteProduct = (req, res, next) => {
   console.log(req.params.id);
   Product.findByPk(req.params.id)
   .then(product => {
      product.destroy()
         .then(()=>{
            console.log('Deleted Done')
            res.redirect('/admin/products')
         })
   })
   .catch(err => console.log(err))
   
   // CartModel.deleteProduct(deletedItem.id,deletedItem.price)

}


