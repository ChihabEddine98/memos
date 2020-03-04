const path=require('path')
const express=require('express')
const bodyParser=require('body-parser')

const adminRoutes=require('./src/routes/admin')

app=express()
app.set('view engine','ejs')
app.set('views','src/views')


app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'src','static')))
app.use(adminRoutes)



app.get('/', (req, res,next)=>{
    res.render('welcome',{pageTitle: 'Welcome Page'})
})

app.listen(8080,function()
{
    console.log('App is listening on port 8080!')
}
)