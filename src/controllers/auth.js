

exports.getLogin =((req,res,next)=>{
    res.render('../views/auth/login.ejs',{ pageTitle :'Connection à Mémos'})
})

exports.getRegister =((req,res,next)=>{
    res.render('../views/auth/register.ejs',{ pageTitle :'Créer un compte '})
})

exports.postRegister =((req,res,next)=>{
    const email=req.body.email
    const password=req.body.password
    const confirm=req.body.confirmPassword

    res.render('../views/auth/login.ejs',{ pageTitle :'Connection à Mémos'})
})


