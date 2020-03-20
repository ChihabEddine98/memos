const User = require('../models/User')
const bcrypt = require('bcryptjs')

exports.getLogin =((req,res,next)=>{
    res.render('../views/auth/login.ejs',{ pageTitle :'Connection à Mémos'})
})

exports.getRegister =((req,res,next)=>{
    res.render('../views/auth/register.ejs',{ pageTitle :'Créer un compte '})
})

exports.postRegister =((req,res,next)=>{
    const nom=req.body.nom
    const prenom =req.body.prenom
    const email=req.body.email
    const password=req.body.password
    const confirm=req.body.confirmPassword

    User.findOne({where :{email:email}})
    .then((user) => {
        if(!user)
        {   
            return bcrypt.hash(password,12)
        }
            
    }).then( hashed_ps => {
        User.create({
            email:email,
            password : hashed_ps,
            first_name: prenom,
            last_name:nom
        })

        res.redirect('/login')
    })
    .catch((err) => {
        
    });



    res.render('../views/auth/login.ejs',{ pageTitle :'Connection à Mémos'})
})









