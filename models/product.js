const fs = require('fs')
const path = require('path')
const filePath = path.join(path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);
const getProductsFromFile = (callBack) => {
    fs.readFile(filePath, (err, fileContent) => {
        let products = []
        if (err) {
            callBack([])
        } else {
            callBack(JSON.parse(fileContent))
        }

    })

}
module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id
        this.title = title
        this.imageUrl = imageUrl
        this.description = description
        this.price = price
    }
    save() {
        fs.readFile(filePath, (err, fileContent) => {
            getProductsFromFile(products => {
                if (this.id) {
                    //edit
                    const editedProductIndex = products.findIndex(i => i.id === this.id)
                    products[editedProductIndex] = this
                } else {
                    //add
                    this.id = Math.random().toString()
                    products.push(this)
                }
                fs.writeFile(filePath, JSON.stringify(products), (err) => {
                    // console.log(products);
                })

            })
        })
    }
    fetchAll(callBack) {
        getProductsFromFile(callBack)
    }
    findById(id, callBack) {
        getProductsFromFile(products => {
            const product = products.find(item => item.id === id)
            callBack(product)

        })
    }


}