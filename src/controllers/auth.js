const User = require('../models/User')

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
            User.create({
                email:email,
                password : password,
                first_name: prenom,
                last_name:nom
            })

            res.render('../views/auth/login.ejs',{ pageTitle :'Connection à Mémos'})
        }
        else  // Exist Déja !
        {
            console.log('connectez vous !')    
        }
            
    }).catch((err) => {
        
    });



    res.render('../views/auth/login.ejs',{ pageTitle :'Connection à Mémos'})
})









