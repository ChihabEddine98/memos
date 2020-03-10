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
                    memos:memos
                    })
                })
            .catch( err => console.log(err) )
    
})


exports.getMesMemos=((req,res,next)=>
{
    req.user.getMemos()
            .then(memos =>
                {
                    res.render('../views/memos.ejs',
                    { pageTitle :'Mémos !',
                    memos:memos
                    })
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
            { pageTitle :'Mémos Detail !',
                memo :memo
            })
            }
        )
        .catch(err => console.log(err))


})

exports.getAddMemo=((req,res,next)=>
{
    res.render('../views/add_memo.ejs',{pageTitle :'Nouveau Mémo'})
})


exports.postAddMemo =((req,res,next)=>
{
    const title = req.body.title
    const description= req.body.description
    const imgUrl = 'url hehe...'

    req.user.createMemo(
        {
         title,description,imgUrl
        }).then((result) => {
            res.redirect('/memos')
        }).catch((err) => {
            console.log(err)
        });

    res.render('../views/add_memo.ejs',{pageTitle :'Nouveau Mémo'})
})





