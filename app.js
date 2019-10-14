const express = require('express')
var bodyParser = require('body-parser')
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const errorController = require('./controllers/error')
const path = require('path')
const db = require('./util/database')
const app = express()

app.set('view engine','ejs')

app.set('views','views')

app.use(bodyParser.urlencoded({extended:false}))

app.use(express.static(path.join(__dirname,'public')))

app.use(adminRoutes)

app.use(shopRoutes)
db.execute('SELECT * FROM products').then((res) => {
    console.log(res[0]);
    
})
.catch((err) => {
    console.log(err);
    
})

app.use(errorController.get404)

app.listen(3000)


