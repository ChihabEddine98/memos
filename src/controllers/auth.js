const User = require('../models/User')
const bcrypt = require('bcryptjs')

exports.getLogin =((req,res,next)=>{

    console.log(' hooyoo ',req.session.isLoggedIn)
    res.render('../views/auth/login.ejs',
    { pageTitle :'Connection à Mémos',
      isAuth : false
    })
})

exports.getRegister =((req,res,next)=>{
    res.render('../views/auth/register.ejs',
    { pageTitle :'Créer un compte ',
      isAuth: false
    })
})

exports.postRegister =((req,res,next)=>{
    const nom=req.body.nom
    const prenom =req.body.prenom
    const email=req.body.email
    const password=req.body.password
    const confirm=req.body.confirmPassword

    User.findOne({where :{email:email}})
    .then(user => {
        if (user) {
          return res.redirect('/register');
        }
        return bcrypt
          .hash(password, 12)
          .then(hashedPass => {
            const user = new User({
              email: email,
              password: hashedPass,
              first_name: prenom,
              last_name:nom
            });
            return user.save();
          })
          .then(result => {
            res.redirect('/login');
          });
      })
    .catch((err) => {
        
    });



    res.render('../views/auth/login.ejs',{ pageTitle :'Connection à Mémos'})
})


exports.postLogin = ((req,res,next)=>{

    const email=req.body.email
    const password= req.body.password

    User.findOne({where : { email: email }})
    .then(user => {
      if (!user) {
        return res.redirect('/login')
      }
      
      bcrypt
        .compare(password, user.password)
        .then(ok => {
          if (ok) {
            
            req.session.isLoggedIn = true
            req.session.user = user
            
            return req.session.save(err => {
              console.log(err)
              res.redirect('/')
            })
          }
          res.redirect('/login')
        })
        .catch(err => {
          console.log(err)
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






