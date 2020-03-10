const path=require('path')
const express=require('express')
const bodyParser=require('body-parser')

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


app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'src','static')))


app.use('/admin',adminRoutes)
app.use(memoRoutes)
app.use(authRoutes)

app.get('/', (req, res,next)=>{
    res.render('welcome',{pageTitle: 'Welcome Page'})
})

Memo.belongsTo(User,{constrains : true,onDelete :'CASCADE'})
User.hasMany(Memo)

db.sync({
    force:true
})
.then(result => {
    console.log('Connection Réussie à La BDD !')
    app.listen(PORT,function()
    {
        console.log(`App is listening on port ${PORT} !`)
    }
)
})
.catch(err => {
    console.log(err)
})



