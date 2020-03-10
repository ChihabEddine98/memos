const path=require('path')
const express=require('express')
const bodyParser=require('body-parser')
const multer=require('multer')

const db=require('./src/common/database')
const Memo=require('./src/models/Memo')
const User=require('./src/models/User')

const adminRoutes=require('./src/routes/admin')
const memoRoutes=require('./src/routes/memo')
const authRoutes=require('./src/routes/auth')


const PORT = 8080

app=express()
app.set('view engine','ejs')
app.set('views','src/views')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(multer().single('memoImage'))
app.use(express.static(path.join(__dirname,'src','static')))
app.use((req,res,next) =>{

    User.findByPk(1)
        .then(user =>
            {
                req.user=user
                next()
            }
            )
        .catch(err => console.log(err))
} )

app.use('/admin',adminRoutes)
app.use(memoRoutes)
app.use(authRoutes)

app.get('/', (req, res,next)=>{
    res.render('welcome',{pageTitle: 'Welcome Page'})
})



Memo.belongsTo(User,{constrains : true,onDelete :'CASCADE'})
User.hasMany(Memo)

// db.sync({
//     force:true
// })
db.sync()
.then(result => {
    console.log('Connection Réussie à La BDD !')
    return User.findByPk(1)

}).then( user => {
    if (!user)
    {
        return User.create({first_name:'Chihab' , last_name: 'Benamara', email:'test@esi.dz'
                            ,imageUrl:'haha.png',password:'123'})
    }
    return user
}
).then (user => {

    app.listen(PORT)
    console.log(`App is listening on port ${PORT} !`)

})
.catch(err => {
    console.log(err)
})



