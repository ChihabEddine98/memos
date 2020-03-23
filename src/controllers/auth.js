const User = require('../models/User')
const bcrypt = require('bcryptjs')

exports.getLogin =((req,res,next)=>{

    let msg=req.flash('error')
    if(msg.length >0)
    {
      msg=msg[0]
    }
    else{
      msg=null
    }
    console.log(' hooyoo ',req.session.isLoggedIn)
    res.render('../views/auth/login.ejs',
    { pageTitle :'Connection à Mémos',
      isAuth : false,
      errMsg: msg
    })
})

exports.getRegister =((req,res,next)=>{

    let msg=req.flash('error')
    if(msg.length >0)
    {
      msg=msg[0]
    }
    else{
      msg=null
    }
    res.render('../views/auth/register.ejs',
    { pageTitle :'Créer un compte ',
      isAuth: false,
      errMsg :msg
    })
})

exports.postRegister =((req,res,next)=>{
    const nom=req.body.nom
    const prenom =req.body.prenom
    const email=req.body.email
    const password=req.body.password
    const image=req.file
    const confirm=req.body.confirmPassword

    console.log(image)
    User.findOne({where :{email:email}})
    .then(user => {
        if (user) {
          req.flash('error',' Cet Email existe Déjà !')
          return res.redirect('/register');
        }
        return bcrypt
          .hash(password, 12)
          .then(hashedPass => {
            const user = new User({
              email: email,
              password: hashedPass,
              first_name: prenom,
              last_name:nom,
              role : 'USER',
              sexe : 'm'
            });
            return user.save();
          })
          .then(result => {
            res.redirect('/login');
          });
      })
    .catch((err) => {
        
    });



    //res.render('../views/auth/login.ejs',{ pageTitle :'Connection à Mémos'})
})


exports.postLogin = ((req,res,next)=>{

    const email=req.body.email
    const password= req.body.password

    User.findOne({where : { email: email }})
    .then(user => {
      if (!user) {
        req.flash('error',' Email Ou Mot de passe invalides')
        return res.redirect('/login')
      }
      
      bcrypt
        .compare(password, user.password)
        .then(ok => {
          if (ok) {
            
            req.session.isLoggedIn = true
            req.session.user = user
            
            if (user.role==='ADMIN'){
              return req.session.save(err => {
                console.log(err)
                req.session.isAdmin = true
                res.redirect('/admin')
              })
            }
            else {
              return req.session.save(err => {
                console.log(err)
                req.session.isAdmin = false
                res.redirect('/')
              })
            }

          }
          req.flash('error',' Email Ou Mot de passe invalides')
          res.redirect('/login')
        })
        .catch(err => {
          req.flash('error',' Email Ou Mot de passe invalides')
          res.redirect('/login')
        })
    })
    .catch(err => console.log(err))

})


exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
      console.log(err)
      res.redirect('/')
    })
}






