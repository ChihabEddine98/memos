const Memo = require('../models/Memo')
const User=require('../models/User')
const Sqlz=require('sequelize')
const Common=require('../common/common')
const { validationResult }=require('express-validator/check')
const bcrypt = require('bcryptjs')


userFullName = async function(userId) {
        
        const user=await User.findByPk(userId)
        return user.first_name+' '+user.last_name
} 

exports.getMemos=((req,res,next)=>
{
    const page=req.query.page
    const maxParPage=3
            Memo.paginate({
                page: page,
                paginate : maxParPage
            })
            .then(({ docs, pages, total }) =>
                {
                    const memos =docs
                    let nbPages
                    if(total%maxParPage===0)
                    {
                        nbPages=total/maxParPage
                    }
                    else
                    {
                        nbPages=total/maxParPage +1
                    }
                    res.render('memos',
                    { pageTitle :'Mémos !',
                      memos:memos,
                      isAuth: req.session.isLoggedIn,
                      canShare:false,
                      userId:req.user.id,
                      total :nbPages,
                      user : req.user,
                      isAdmin : req.session.isAdmin,
                      path:'/memos'
                    })
                })
            .catch( err => console.log(err) )
    
})


exports.getMesMemos=((req,res,next)=>
{

    const page=req.query.page
    const maxParPage=3
    const User_Memo=require('../models/User_Memo')
 
    
    User_Memo.paginate({
        page: page,
        paginate : maxParPage,
        where :{ userId:req.user.id} ,
        attributes: [
            'memoId'
         ],
        }
        )
            .then(({ docs, pages, total }) =>
                {
                    
                    
                    Memo.findAll({
                        where :{id : docs.map(d=>d.memoId)}
                    }).then((memos)=>{
                        let nbPages
                        if(total%maxParPage===0)
                        {
                            nbPages=total/maxParPage
                        }
                        else
                        {
                            nbPages=total/maxParPage +1
                        }
    
                        User.findAll({
                            where: {
                              id: {
                                [Sqlz.Op.not]: req.user.id
                              }
                            }
                          })
                        .then(users =>{
    
        
                            res.render('memos',
                            { pageTitle :'Mémos !',
                              memos:memos,
                              users:users,
                              isAuth: req.session.isLoggedIn,
                              canShare:true,
                              userId:req.user.id,
                              total :nbPages,
                              user : req.user,
                              isAdmin:req.session.isAdmin,
                              path:'/mes_memos'
                
                            })
                        })
                        .catch(
                            err=>console.log(err)
                        )
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
                User.findAll({
                    where: {
                      id: {
                        [Sqlz.Op.not]: req.user.id
                      }
                    }
                  }).then( users =>{
                        return users
                  }).then(users=>{

                    const sql='select users.first_name,last_name,img_url from users where id='+memo.owner+';'
                    User.findByPk(memo.owner).then( userOwner =>{
                      res.render('memo_detail',
                      {   pageTitle :'Mémos Detail !',
                          memo :memo,
                          isAuth: req.session.isLoggedIn,
                          user : req.user,
                          users :users,
                          isAdmin :req.session.isAdmin,
                          owner :userOwner,
                          path:'/memos'
                      })
                    })
            

                  })

            }
        )
        .catch(err => console.log(err))



})

exports.getAddMemo=((req,res,next)=>
{
    res.render('add_memo',
                {
                  pageTitle :'Nouveau Mémo',
                  isAuth: req.session.isLoggedIn ,
                  user : req.user,
                  isAdmin :req.session.isAdmin,
                  path:'/add_memo'
                })
})

exports.getEditMemo=((req,res,next)=>
{
    const memoId=req.params.memoId
    Memo.findByPk(memoId)
        .then( memo => 
            {

            res.render('edit_memo',
            {
                pageTitle :'Nouveau Mémo',
                isAuth: req.session.isLoggedIn ,
                user : req.user,
                isAdmin :req.session.isAdmin,
                memo :memo,
                path:'/add_memo'
                
            })
        })
        .catch(err => console.log(err))



})


exports.postEditMemo =((req,res,next)=>
{
    const title = req.body.title
    const description= req.body.description
    const image =req.file
    let imgUrl =null
    if(image)
    {
        imgUrl = image.path.substring(19)
    }
    


      Memo.findByPk(req.body.memoId)
          .then(memo =>{
            
            memo.title=title
            memo.description=description
            if(imgUrl)
            {
                memo.imgUrl=imgUrl
            }

            memo.save()
            if( req.session.isAdmin)
            {
               return res.redirect('/admin/all_memos')
            }
            else
            {
               return res.redirect('/all_memos')
            }

          })

    // res.render('../views/add_memo.ejs',
    //             {pageTitle :'Nouveau Mémo',
    //              isAuth : req.session.isLoggedIn})
})

exports.postAddMemo =((req,res,next)=>
{
    const title = req.body.title
    const description= req.body.description
    const image =req.file
    let imgUrl =null
    if(image)
    {
      imgUrl =image.path.substring(19)
    }

      User.findByPk(req.user.id)
          .then( user =>{
            


            user.createMemo({
                title:title,
                description:description,
                imgUrl:imgUrl,
                owner:req.user.id,
                userId:req.user.id,
                    })
            .then(result => {
                if( req.session.isAdmin)
                {
                   result.isShared=false
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
    const User_Memo=require('../models/User_Memo')
    const db =require('../common/database')
    
    Memo.findByPk(memoId)
        .then(memo =>{
            
            User.findAll({where :{id:selected_users }})
                .then( users => {
                    for(let user of users)
                    {
                        user.addMemo(memo,{isShared:1})
                    }
                })
        }).then(()=>{
            Memo.findByPk(memoId)
            .then(memo =>{
  
              User.findAll({where :{id:selected_users }}) 
                  .then( users =>{
                  for(let user of users){
                      let sql='UPDATE user_memos SET isShared=1 WHERE memoId='+memo.id+' AND userId='+user.id+';'
                      db.query(sql)
                              .then(result=>{
                                      
                              })
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
            })
    
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

exports.getEditUser =((req,res,next)=>{

    let msg=req.flash('error')
    if(msg.length >0)
    {
      msg=msg[0]
    }
    else{
      msg=null
    }
    const user=req.user
    res.render('edit_user',
    { pageTitle :'Modifier vos informations ',
      isAuth: true,
      isAdmin : true,
      errMsg :msg,
      user :user,
      oldInput: {
        nom:user.first_name,
        prenom:user.last_name,
        email : user.email,
        password: "",
        confirmPassword :""
      },
      errorsFields : [],
      path:'/edit'
    })
  })
  


  exports.postEditUser =((req,res,next)=>{
    const nom=req.body.nom
    const prenom =req.body.prenom
    const email=req.body.email
    const password=req.body.password
    const image=req.file

  
    const errors=validationResult(req)
    if( !errors.isEmpty())
    {
      if(password)
      {
        return res.render('edit_user',
        { pageTitle :'Modifier Vos Infos ',
          isAuth: true,
          isAdmin: req.session.isAdmin,
          user: req.user,
          errMsg :errors.array()[0].msg,
          oldInput: {
            nom:nom,
            prenom:prenom,
            email : email,
            password: password,
            confirmPassword :""
          },
          errorsFields : errors.array(),
          path:'/edit'
        })
      }
  
    }
  
        User.findByPk(req.user.id)
             .then(user =>{
  
              if(image)
              {
               
                user.img_url =image.path.substring(19)
                user.save()
                return user
              }
              return user
              })
              .then(user=>{
                if(password)
                {
                 bcrypt
                 .hash(password, 12)
                 .then(hashedPass => {
   
                   user.password=hashedPass
                   user.save()
                   if( req.session.isAdmin)
                   {
                    return res.redirect('/admin/all_users/')
  
                   }
                   else
                   {
                    return res.redirect('/')
  
                   }
                   
                 })
                }
                if( req.session.isAdmin)
                {
                 return res.redirect('/admin/all_users/')
  
                }
                else
                {
                 return res.redirect('/')
  
                }
              })
                
        
  
    //res.render('../views/auth/login.ejs',{ pageTitle :'Connection à Mémos'})
  })
