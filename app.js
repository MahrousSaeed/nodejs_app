const express = require('express')
var bodyParser = require('body-parser')
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const errorController = require('./controllers/error')
const path = require('path')
const sequelize = require('./util/database')
const Product = require('./models/product')
const User = require('./models/user')

const app = express()

app.set('view engine','ejs')

app.set('views','views')

app.use(bodyParser.urlencoded({extended:false}))

app.use(express.static(path.join(__dirname,'public')))

app.use(adminRoutes)

app.use(shopRoutes)

app.use(errorController.get404)

Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'})
User.hasMany(Product)

app.use((req,res,next)=> {
    User.findByPk(1).then((user)=>{
        req.user = user
        next()
    }).catch(err => console.log(err))
})

sequelize
// .sync({force:true})
.sync()
.then(() =>{
    return User.findByPk(1)
})
.then(user => {
    if(!user){
       return  User.create({
            name:'Mahrous',
            email:'test@test.com'
        })
    }
    return user
})
.then(() => {
    app.listen(3000)
})
.catch()




