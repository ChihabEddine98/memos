const Memo = require('../models/Memo')
const User=require('../models/User')

let memos=[ 
    {title : 'Objet Trouvé ',
     imgUrl : 'https://images.unsplash.com/photo-1502759683299-cdcd6974244f?auto=format&fit=crop&w=440&h=220&q=60',
     description :"Le Lorem Ipsum est rression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécim",
    },
    {title : 'Autre Truc',
    imgUrl : 'https://images.unsplash.com/photo-1502759683299-cdcd6974244f?auto=format&fit=crop&w=440&h=220&q=60',
    description :"Le Lorem Ipsum est rression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécim",
   },
   {title : 'Autre Truc',
   imgUrl : 'https://images.unsplash.com/photo-1502759683299-cdcd6974244f?auto=format&fit=crop&w=440&h=220&q=60',
   description :"Le Lorem Ipsum est rression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécim",
  },
  {title : 'Autre Truc',
  imgUrl : 'https://images.unsplash.com/photo-1502759683299-cdcd6974244f?auto=format&fit=crop&w=440&h=220&q=60',
  description :"Le Lorem Ipsum est rression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécim",
 },
 {title : 'Autre Truc',
 imgUrl : 'https://images.unsplash.com/photo-1502759683299-cdcd6974244f?auto=format&fit=crop&w=440&h=220&q=60',
 description :"Le Lorem Ipsum est rression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécim",
},
{title : 'Autre Truc',
imgUrl : 'https://images.unsplash.com/photo-1502759683299-cdcd6974244f?auto=format&fit=crop&w=440&h=220&q=60',
description :"Le Lorem Ipsum est rression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécim",
},
{title : 'Autre Truc',
imgUrl : 'https://images.unsplash.com/photo-1502759683299-cdcd6974244f?auto=format&fit=crop&w=440&h=220&q=60',
description :"Le Lorem Ipsum est rression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécim",
}
]

exports.getMemos=((req,res,next)=>
{
    Memo.findAll()
            .then(memos =>
                {
                    res.render('../views/memos.ejs',
                    { pageTitle :'Mémos !',
                      memos:memos,
                      isAuth: req.session.isLoggedIn,
                      canShare:false
                    })
                })
            .catch( err => console.log(err) )
    
})


exports.getMesMemos=((req,res,next)=>
{
    req.user.getMemos()
            .then(memos =>
                {
                    User.findAll()
                    .then(users =>{
                        res.render('../views/memos.ejs',
                        { pageTitle :'Mémos !',
                          memos:memos,
                          users:users,
                          isAuth: req.session.isLoggedIn,
                          canShare:true
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
    const memo=new Memo(
        {
            title:title,
            description:description,
            imgUrl:imgUrl,
            userId:req.user.id
        }
    )

      User.findByPk(req.user.id)
          .then( user =>{
            
            user.createMemo({
                title:title,
                description:description,
                imgUrl:imgUrl,
                userId:req.user.id
            })
            res.redirect('/all_memos')
          })
          .catch( err=> console.log(err))

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

    console.log('chocies :',selected_users)

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




