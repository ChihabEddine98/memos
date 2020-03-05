const express=require('express')
const memoController=require('../controllers/memos')
const router=express.Router()


router.get('/add',memoController.getAddMemo)
router.get('/',memoController.getMemos)

module.exports=router