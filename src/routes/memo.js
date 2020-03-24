const express=require('express')
const memoController=require('../controllers/memos')
const router=express.Router()


router.get('/add_memo',memoController.getAddMemo)
router.get('/edit_memo/:memoId',memoController.getEditMemo)
router.get('/mes_memos',memoController.getMesMemos)
router.get('/all_memos',memoController.getMemos)
router.get('/memos/:memoId',memoController.getMemo)

router.post('/delete_memo',memoController.postDeleteMemo)
router.post('/add_memo',memoController.postAddMemo)
router.post('/share_memo',memoController.postShareMemo)
router.post('/edit_memo',memoController.postEditMemo)


module.exports=router