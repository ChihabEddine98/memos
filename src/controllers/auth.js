

exports.getLogin =((req,res,next)=>{
    res.render('../views/auth/login.ejs',{ pageTitle :'Connection à Mémos'})
})

exports.getRegister =((req,res,next)=>{
    res.render('../views/auth/register.ejs',{ pageTitle :'Créer un compte '})
})

exports.postRegister =((req,res,next)=>{
    res.render('../views/auth/login.ejs',{ pageTitle :'Connection à Mémos'})
})


