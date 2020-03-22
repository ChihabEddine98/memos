const Memo=require('../models/Memo')
const User=require('../models/User')
const Sqlz=require('sequelize')

exports.getIndex =((req,res,next)=> {

    res.render('../views/admin/index.ejs',
    {
       pageTitle :' Admin Panel ' ,
       isAuth :req.session.isLoggedIn,
       user : req.user
    })

})

exports.getUsers =((req,res,next)=> {

    User.findAll()
            .then(users =>
                {
                    res.render('../views/admin/users.ejs',
                    { pageTitle :'Users !',
                      users:users,
                      isAuth: req.session.isLoggedIn,
                      userId:req.user.id,
                      user : req.user
                    })
                })
            .catch( err => console.log(err) )

})



exports.getMemos=((req,res,next)=>
{
    Memo.findAll()
            .then(memos =>
                {
                    res.render('../views/admin/memos.ejs',
                    { pageTitle :'Mémos !',
                      memos:memos,
                      isAuth: req.session.isLoggedIn,
                      canShare:false,
                      userId:req.user.id,
                      user : req.user
                    })
                })
            .catch( err => console.log(err) )
    
})

exports.getAddMemo=((req,res,next)=>
{
    res.render('../views/admin/add_memo.ejs',
                {
                  pageTitle :'Nouveau Mémo',
                  isAuth: req.session.isLoggedIn ,
                  user : req.user
                })
})

exports.getStats =((req,res,next)=> {

    res.render('../views/admin/index.ejs',
    {
       pageTitle :' Admin Panel ' ,
       isAuth :req.session.isLoggedIn,
       user : req.user
    })

})

exports.getMemo =((req,res,next)=> 
{
    const memoId=req.params.memoId
    Memo.findByPk(memoId)
        .then( memo => 
            {
                User.findAll({
                    where: {
                      id: {
                        [Sqlz.Op.not]: req.user.id
                      }
                    }
                  }).then( users =>{
                    res.render('../views/admin/memo_detail.ejs',
                    {   pageTitle :'Mémos Detail !',
                        memo :memo,
                        isAuth: req.session.isLoggedIn,
                        user : req.user,
                        users :users,
                        isAdmin :req.session.isAdmin
                    })
                  })

            }
        )
        .catch(err => console.log(err))


})