const path=require('path')
const express=require('express')
const bodyParser=require('body-parser')
const multer=require('multer')
const session=require('express-session')
const flash=require('connect-flash')
const Sqlz=require('sequelize')
const bcrypt=require('bcryptjs')
const Common =require('./src/common/common')


const db=require('./src/common/database')
const Memo=require('./src/models/Memo')
const User=require('./src/models/User')
const User_Memo=require('./src/models/User_Memo')

const adminRoutes=require('./src/routes/admin')
const memoRoutes=require('./src/routes/memo')
const authRoutes=require('./src/routes/auth')

const fileStore=multer.diskStorage({
    destination :(req,file,cb)=>{
        cb(null,path.join('src','uploaded_images'))
    },
    filename: (req,file,cb)=>{
        cb(null,new Date().toISOString().replace(/:/g, '_')+'__'+file.originalname)
    }
})

const fileFilter=(req,file,cb)=>{
    if(file.mimetype ==='image/jpg' || file.mimetype ==='image/png' 
            ||file.mimetype ==='image/jpeg')
            {
                cb(null,true)
            }
    else{
        cb(null,false)
    }
}
const PORT = 8080

app=express()
app.set('view engine','ejs')
app.set('views','src/views')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(multer({storage:fileStore,fileFilter:fileFilter}).single('image'))

app.use(express.static(path.join(__dirname,'src','static')))
app.use(express.static(path.join(__dirname,'src','uploaded_images')))

app.use(session(
        {
            secret:'chihab',
            resave: false,
            saveUninitialized:false
        }
))

app.use(flash())

app.use((req,res,next) =>{

    if (!req.session.user) {
        return next()
      }
      
      User.findByPk(req.session.user.id)
        .then(user => {
          req.user = user
          next()
        })
        .catch(err => console.log(err))
} )

app.use('/admin',adminRoutes)
app.use(memoRoutes)
app.use(authRoutes)

app.get('/', (req, res,next)=>{
    
    res.render('welcome',
        { pageTitle: 'Welcome Page',
          isAuth: req.session.isLoggedIn,
          user : req.user,
          isAdmin:req.session.isAdmin,
          path:'/'
        })
})


User.belongsToMany(Memo, { through: User_Memo ,onDelete: 'cascade', });
Memo.belongsToMany(User, { through: User_Memo ,onDelete: 'cascade', });

//Memo.belongsTo(User,{constrains : true,onDelete :'CASCADE'})
//User.hasMany(Memo)
// db.sync({
//     force:true
// })
db.sync()
.then(result => {
    console.log('Connection Réussie à La BDD !')
    return User.findByPk(1)

    })
    .then( user => {
    if (!user)
    {
        return Common.createAdmin()
    }
    return null
    }).then(user=>{
        app.listen(PORT)
        console.log(`localhost:${PORT}`)
    })
    .catch(err => {
    console.log(err)
        })



