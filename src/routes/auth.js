const express = require('express')
const authController=require('../controllers/auth')
const router=express.Router()


router.get('/login',authController.getLogin)
router.get('/register',authController.getRegister)

module.exports=router