const express=require('express')
const memoController=require('../controllers/memos')
const router=express.Router()
const { body }=require('express-validator/check')



router.get('/add_memo',memoController.getAddMemo)
router.get('/edit_memo/:memoId',memoController.getEditMemo)
router.get('/mes_memos',memoController.getMesMemos)
router.get('/all_memos',memoController.getMemos)
router.get('/memos/:memoId',memoController.getMemo)
router.get('/edit_user',memoController.getEditUser)



router.post('/delete_memo',memoController.postDeleteMemo)
router.post('/add_memo',memoController.postAddMemo)
router.post('/share_memo',memoController.postShareMemo)
router.post('/edit_memo',memoController.postEditMemo)
router.post('/edit_user',[
    body('password').isLength({min: 3})
    .withMessage(" Le mot de passe doit etre au minimum 6 characteres !"),    
    body('confirmPassword').custom((value,{req})=>{
        if( value !== req.body.password)
        {
            throw new Error(' La confirmation du mot de passe est invalide !')
        }
        return true
    })
],memoController.postEditUser)

module.exports=router