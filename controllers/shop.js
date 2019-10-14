const Product = require('../models/product')
const cartModel = require('../models/cart')
exports.getProducts = (req,res,next) => {
   const product = new Product('sfsfsf')
   const products = product.fetchAll((products) => {
       res.render('shop/index',{ prods: products , docTitle:'Shop',path:'/'})
   })    
}
exports.getAllProducts = (req,res,next) => {
   const product = new Product('')
   const products = product.fetchAll((products) => {
       res.render('shop/product-list',{ prods: products , docTitle:'products list',path:'/'})
   })    
}
exports.getOneProduct = (req,res,next) => {
    const prodId = req.params.id
    // console.log(prodId);
    const product = new Product('')
    const products = product.findById(prodId,product =>{
        // console.log('product ',product)
        res.render('shop/product-details',{ product: product , docTitle:'product details',path:'/'})  
    })  
    // res.redirect('/')
}

exports.getCart = (req,res,next) =>{
    const cartt = new cartModel()
    cartModel.getCartData(data=>{
        // console.log(data);
        const product = new Product()
        product.fetchAll((products)=>{
            const allProducts = products
            const newProductss = []
            for(prod of data.products){
               
                const newProducts = [
                    { products:[], totalPrice:data.totalPrice}
                ]
                const newProduct = allProducts.find(item=>item.id === prod.id)
                if(newProduct){
                    // console.log(newProduct);
                    
                    newProductss.push({
                        id:newProduct.id,
                        title:newProduct.title,
                        qty:prod.qty,
                        totalCartPrice:data.totalPrice
                    })
                }
                // console.log('newProducts',newProductss);
                
            }
            res.render('shop/cart',{
                data:newProductss,
                docTitle:'Cart'
            })
        })

    })
    
}
exports.postCart = (req,res,next) =>{
    const productId = req.body.productId
    const product = new Product('')
    const productData = product.findById(productId,product => {
        cartModel.addProduct(productId,product.price)
        res.redirect('/cart')
        // res.render('/shop/cart',{product:product,docTitle:'Cart'})
    }) 
}
exports.deleteItem = (req,res,next) =>{
    const productId = req.body.productId
    // console.log(productId);
    cartModel.deleteCartItem(productId)
    
    // cartModel.addProduct(productId,product.price)
    res.redirect('/cart')
}

exports.orders = (req,res,next) =>{
    res.render('shop/orders',{docTitle:'Orders'})
}
exports.index = (req,res,next) =>{
    const product = new Product('')
    const products = product.fetchAll((products) => {
        res.render('shop/index',{ prods: products , docTitle:'index',path:'/'})
    })  
}

exports.checkout = (req,res,next) =>{
    res.render('shop/checkout',{docTitle:'checkout'})
}