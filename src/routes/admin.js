const express=require('express')
const adminController=require('../controllers/admin')

const router=express.Router()

router.get('/',adminController.getIndex)
router.get('/all_users',adminController.getUsers)
router.get('/all_memos',adminController.getMemos)
router.get('/add_memo',adminController.getAddMemo)
router.get('/stats',adminController.getStats)
router.get('/memos/:memoId',adminController.getMemo)

router.get('/stats_data',adminController.getStatsData)



module.exports=router