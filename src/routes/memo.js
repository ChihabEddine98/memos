const express=require('express')
const memoController=require('../controllers/memos')
const router=express.Router()

router.get('/',memoController.getAddMemo)

module.exports=router