const Memo = require('../models/Memo')
const User=require('../models/User')
const Sqlz=require('sequelize')
const Common=require('../common/common')


userFullName = async function(userId) {
        
        const user=await User.findByPk(userId)
        return user.first_name+' '+user.last_name
} 

exports.getMemos=((req,res,next)=>
{
    Memo.findAll()
            .then(memos =>
                {
                    res.render('../views/memos.ejs',
                    { pageTitle :'Mémos !',
                      memos:memos,
                      isAuth: req.session.isLoggedIn,
                      canShare:false,
                      
                    })
                })
            .catch( err => console.log(err) )
    
})


exports.getMesMemos=((req,res,next)=>
{
    req.user.getMemos()
            .then(memos =>
                {
                    User.findAll({
                        where: {
                          id: {
                            [Sqlz.Op.not]: req.user.id
                          }
                        }
                      })
                    .then(users =>{

    
                        res.render('../views/memos.ejs',
                        { pageTitle :'Mémos !',
                          memos:memos,
                          users:users,
                          isAuth: req.session.isLoggedIn,
                          canShare:true,
                          userId:req.user.id
                        })
                    })
                    .catch(
                        err=>console.log(err)
                    )

                })
            .catch( err => console.log(err) )
    
})

exports.getMemo =((req,res,next)=> 
{
    const memoId=req.params.memoId
    Memo.findByPk(memoId)
        .then( memo => 
            {
            res.render('../views/memo_detail.ejs',
            {   pageTitle :'Mémos Detail !',
                memo :memo,
                isAuth: req.session.isLoggedIn
            })
            }
        )
        .catch(err => console.log(err))


})

exports.getAddMemo=((req,res,next)=>
{
    res.render('../views/add_memo.ejs',
                {
                  pageTitle :'Nouveau Mémo',
                  isAuth: req.session.isLoggedIn 
                })
})


exports.postAddMemo =((req,res,next)=>
{
    const title = req.body.title
    const description= req.body.description
    const imgUrl = 'url hehe...'


      User.findByPk(req.user.id)
          .then( user =>{
            
            user.createMemo({
                title:title,
                description:description,
                imgUrl:imgUrl,
                owner:req.user.id,
                userId:req.user.id
                    })
            .then(result => {
                res.redirect('/all_memos')
            })
            .catch( err=> console.log(err))
          })
    .catch(err => {
      console.log(err)
    })

    res.render('../views/add_memo.ejs',
                {pageTitle :'Nouveau Mémo',
                 isAuth : req.session.isLoggedIn})
})


exports.postShareMemo = ((req,res,next)=>{

    const memoId=req.body.memoId
    const selected_users=req.body.share_choices

    Memo.findByPk(memoId)
        .then(memo =>{
            
            User.findAll({where :{id:selected_users }})
                .then( users => {
                    for(let user of users)
                    {
                        user.addMemo(memo)
                    }

                    res.redirect('/')
                })
                .catch(err =>console.log(err))
        })
        .catch(err =>console.log(err))

})

exports.postDeleteMemo=((req,res,next)=>
{
    const memoId=req.body.memoId

    Memo.findByPk(memoId)
        .then((memo) => {
            return memo.destroy()
        })
        .then( result =>
            {
                console.log (' Deleted...')
                res.redirect('/mes_memos')
            }
        )
        .catch((err) => {
            console.log(err)
        });

}) 




