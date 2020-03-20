const express = require('express')
const authController=require('../controllers/auth')
const router=express.Router()


router.get('/login',authController.getLogin)
router.post('/login',authController.postLogin)

router.get('/register',authController.getRegister)
router.post('/register',authController.postRegister)

router.post('/logout', authController.postLogout)


module.exports=router