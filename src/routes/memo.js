const express=require('express')
const memoController=require('../controllers/memos')
const router=express.Router()


router.get('/add_memo',memoController.getAddMemo)
router.get('/memos',memoController.getMemos)

module.exports=router