const express = require('express')
const authController=require('../controllers/auth')
const router=express.Router()
const { check,body }=require('express-validator/check')
const User=require('../models/User')


router.get('/login',authController.getLogin)
router.post('/login',  [
    body('email')
      .isEmail()
      .withMessage('Veuillez Entrer un email existant'),
    body('password', 'Entrez un mot de passe valide')
      .isLength({ min:3  })
  ],authController.postLogin)

router.get('/register',authController.getRegister)
router.post('/register',[
                    check('email').isEmail()
                    .withMessage("L'email n'est pas valide !")
                    .custom((value,{req})=>{
                        return User.findOne({where :{email:value}})
                            .then( user=>{
                                if(user)
                                {
                                    return Promise.reject('Cet Email existe Déjà choissisez un autre !')
                                }
                            })
                    }),
                    body('password').isLength({min: 6})
                    .withMessage(" Le mot de passe doit etre au minimum 6 characteres !"),    
                    body('confirmPassword').custom((value,{req})=>{
                        if( value !== req.body.password)
                        {
                            throw new Error(' La confirmation du mot de passe est invalide !')
                        }
                        return true
                    })
                ]
                        ,authController.postRegister)

router.post('/logout', authController.postLogout)


module.exports=router