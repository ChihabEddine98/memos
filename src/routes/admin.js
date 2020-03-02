const express=require('express')
const router=express.Router()

router.get('/add-memo',(req,res,next)=>{
    res.send(" Yohoooo Helllo ")
})

module.exports=router