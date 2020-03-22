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
                      userId:req.user.id,
                      user : req.user
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
                          userId:req.user.id,
                          user : req.user
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
                User.findAll({
                    where: {
                      id: {
                        [Sqlz.Op.not]: req.user.id
                      }
                    }
                  }).then( users =>{
                    res.render('../views/memo_detail.ejs',
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

exports.getAddMemo=((req,res,next)=>
{
    res.render('../views/add_memo.ejs',
                {
                  pageTitle :'Nouveau Mémo',
                  isAuth: req.session.isLoggedIn ,
                  user : req.user
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
                if( req.session.isAdmin)
                {
                   return res.redirect('/admin/all_memos')
                }
                else
                {
                   return res.redirect('/all_memos')
                }
                
            })
            .catch( err=> console.log(err))
          })
    .catch(err => {
      console.log(err)
    })

    // res.render('../views/add_memo.ejs',
    //             {pageTitle :'Nouveau Mémo',
    //              isAuth : req.session.isLoggedIn})
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

                    if( req.session.isAdmin)
                    {
                       return res.redirect('/admin')
                    }
                    else
                    {
                       return res.redirect('/mes_memos')
                    }
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
                if( req.session.isAdmin)
                {
                    res.redirect('/admin/all_memos')
                }
                else
                {
                    res.redirect('/mes_memos')
                }
            }
        )
        .catch((err) => {
            console.log(err)
        });

}) 




