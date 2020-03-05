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
    res.render('../views/memos.ejs',{ pageTitle :'Mémos !',memos:memos})
})

exports.getAddMemo=((req,res,next)=>
{
    res.send(" Yohoooo Helllo ")
})