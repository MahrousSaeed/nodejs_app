const fs = require('fs');
const path = require('path');
const Product = require('./product')
const filePath = path.join(path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);


module.exports = class cart {
    // products
    //total price
    static addProduct(id, productPrice) {
        // fetch the previous cart
        fs.readFile(filePath, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 }
            if (!err) {
                cart = JSON.parse(fileContent)
            }
            // analize the cart => find existing product
            //لو المنتج اللي بضيفة انا كنت ضفتة قبل كدا هزود الكميه والسعر 
            const existingProductIndex = cart.products.findIndex(d => d.id === id)
            const existingProduct = cart.products[existingProductIndex]
            let updatedProduct;
            // add new product /increase quantity
            if (existingProduct) {
                updatedProduct = { ...existingProduct }
                updatedProduct.qty = existingProduct.qty + 1
                cart.products = [...cart.products]
                cart.products[existingProductIndex] = updatedProduct

            } else {
                updatedProduct = { id: id, qty: 1 }
                cart.products = [...cart.products, updatedProduct]
            }
            cart.totalPrice = cart.totalPrice + + productPrice
            fs.writeFile(filePath, JSON.stringify(cart), err => {
                console.log(err);

            })
        })
    }
    static getCartData(callBack) {
        fs.readFile(filePath, (err, fileContent) => {
            if (err)
                callBack({})
            callBack(JSON.parse(fileContent))
        })
    }
    static deleteProduct(id,price){
        fs.readFile(filePath, (err, fileContent) => {
            let cartData = JSON.parse(fileContent)
            let updatedCart = cartData.products
            const updated = updatedCart.filter(item =>item.id !== id)
            const updatedItem = updatedCart.find(item =>item.id === id)
            console.log('qty',updatedItem.qty);
            
            console.log(updated);
            cartData.products = updated
            cartData.totalPrice = cartData.totalPrice - price * updatedItem.qty
            fs.writeFile(filePath,JSON.stringify(cartData),(err)=>{

            })
        });
        
    }
    static deleteCartItem(id){
        //code 
        console.log(id);
        this.getCartData((data)=>{
            console.log(data);
            let  cart_products =  data.products
            const product = new Product()
            product.findById(id,product => {
                const delete_Product = product
                 cart_products = cart_products.filter(item => item.id !== id )
                 const product_cart = cart_products.find(item => item.id === id )
                // cart_products.splice(productIndex,1)
                console.log('sddsd',cart_products);
                data.products = cart_products
                // data.totalPrice = data.totalPrice - product.price*product_cart.qty
                console.log('data',data);
                
            })
            
        })
    }
}