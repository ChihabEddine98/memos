const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { validationResult }=require('express-validator/check')


exports.getLogin =((req,res,next)=>{

    let msg=req.flash('error')
    if(msg.length >0)
    {
      msg=msg[0]
    }
    else{
      msg=null
    }
    
    res.render('auth/login',
    { pageTitle :'Connection à Mémos',
      isAuth : false,
      errMsg: msg,
      oldInput :{
        email:"",
        password :""
      },
      errorsFields :[],
      path:'/login'
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
    res.render('auth/register',
    { pageTitle :'Créer un compte ',
      isAuth: false,
      errMsg :msg,
      oldInput: {
        nom:"",
        prenom:"",
        email : "",
        password: "",
        confirmPassword :""
      },
      errorsFields : [],
      path:'/register'
    })
})

exports.postRegister =((req,res,next)=>{
    const nom=req.body.nom
    const prenom =req.body.prenom
    const email=req.body.email
    const password=req.body.password
    const image=req.file
    const sexe=req.body.gender
    let imgUrl=null


    const errors=validationResult(req)
    if( !errors.isEmpty())
    {
      return res.render('auth/register',
      { pageTitle :'Créer un compte ',
        isAuth: false,
        errMsg :errors.array()[0].msg,
        oldInput: {
          nom:nom,
          prenom:prenom,
          email : email,
          password: password,
          confirmPassword :req.body.confirmPassword
        },
        errorsFields : errors.array(),
        path:'/register'
      })
    }
        bcrypt
          .hash(password, 12)
          .then(hashedPass => {
          
            if(image)
            {
              imgUrl =image.path.substring(19)
            }
            
            const user = new User({
              email: email,
              password: hashedPass,
              first_name: prenom,
              last_name:nom,
              img_url :imgUrl,
              role : 'USER',
              sexe : sexe
            });
            return user.save()
          })
          .then(result => {
            res.redirect('/login')
          })



    //res.render('../views/auth/login.ejs',{ pageTitle :'Connection à Mémos'})
})


exports.postLogin = ((req,res,next)=>{

    const email=req.body.email
    const password= req.body.password

    const errors=validationResult(req)

    if(!errors.isEmpty())
    {
      return res.render('auth/login',
      { pageTitle :'Connection à Mémos',
        isAuth : false,
        errMsg: errors.array()[0].msg,
        oldInput :{
          email:email,
          password :password
        },
        errorsFields : errors.array(),
        path:'/login'
      })
    }

    User.findOne({where : { email: email }})
    .then(user => {
      if(!user)
      {
        return res.render('auth/login',
        { pageTitle :'Connection à Mémos',
          isAuth : false,
          errMsg: 'Email Ou Mot de passe invalides',
          oldInput :{
            email:email,
            password :password
          },
          errorsFields : errors.array(),
          path : '/login'
        })
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






