const Memo=require('../models/Memo')
const User=require('../models/User')

exports.getIndex =((req,res,next)=> {

    res.render('../views/admin/index.ejs',
    {
       pageTitle :' Admin Panel ' ,
       isAuth :req.session.isLoggedIn,
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
                      userId:req.user.id
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
                      userId:req.user.id
                    })
                })
            .catch( err => console.log(err) )
    
})

exports.getAddMemo=((req,res,next)=>
{
    res.render('../views/admin/add_memo.ejs',
                {
                  pageTitle :'Nouveau Mémo',
                  isAuth: req.session.isLoggedIn 
                })
})

exports.getStats =((req,res,next)=> {

    res.render('../views/admin/index.ejs',
    {
       pageTitle :' Admin Panel ' ,
       isAuth :req.session.isLoggedIn,
    })

})