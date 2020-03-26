const Memo=require('../models/Memo')
const User=require('../models/User')
const Sqlz=require('sequelize')
const db=require('../common/database')
const { validationResult }=require('express-validator/check')
const bcrypt = require('bcryptjs')



exports.getIndex =((req,res,next)=> {

    res.render('../views/admin/index.ejs',
    {
       pageTitle :' Admin Panel ' ,
       isAuth :req.session.isLoggedIn,
       user : req.user,
       path:'/admin'
    })

})

exports.getUsers =((req,res,next)=> {

  const page=req.query.page
  const maxParPage=3
  
    User.paginate({
      page: page,
      paginate : maxParPage
          })
            .then(({ docs, pages, total }) =>
                {
                    const users=docs
                    let nbPages
                    if(total%maxParPage===0)
                    {
                        nbPages=total/maxParPage
                    }
                    else
                    {
                        nbPages=total/maxParPage +1
                    }

                    res.render('../views/admin/users.ejs',
                    { pageTitle :'Users !',
                      users:users,
                      isAuth: req.session.isLoggedIn,
                      userId:req.user.id,
                      user : req.user,
                      total:nbPages,
                      path:'/admin/usr'
                    })
                })
            .catch( err => console.log(err) )

})



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
                    path:'/admin/memos'
                  })
              })
          .catch( err => console.log(err) )
  
    
})

exports.getAddMemo=((req,res,next)=>
{
    res.render('../views/add_memo.ejs',
                {
                  pageTitle :'Nouveau Mémo',
                  isAuth: req.session.isLoggedIn ,
                  user : req.user,
                  isAdmin :req.session.isAdmin,
                  path:'/admin/add_memo'
                })
})


exports.getSharedMemosData =((req,res,next)=>{
  let sql='SELECT memos.title as memo_title,sum(case isShared when 1 then 1 else 0 end) as value from user_memos JOIN memos on (memoId=memos.id) GROUP BY user_memos.memoId;'
  let label='memo_title'

  db.query(sql).then(result =>{

    var labels=[]
    var values=[]
    for(let val of result[0])
    {
        labels.push(val[label])
        values.push(val['value'])
    }

    var data ={
      labels:labels,
      values :values
    }
    res.send(data)
})
  

})

exports.getSharedStatsData =((req,res,next)=> {
  let sql='select users.first_name,users.last_name,sum(case isShared when 1 then 1 else 0 end) as nb_shares FROM user_memos JOIN users ON (users.id=user_memos.userId) GROUP BY userId'
  sql =`CREATE TEMPORARY TABLE IF NOT EXISTS sharers SELECT memos.owner FROMmemos JOIN user_memos ON (memos.id = user_memos.memoId);
  CREATE TEMPORARY TABLE IF NOT EXISTS shared
  SELECT memos.owner as id, sum(case isShared when 1 then 1 else 0 end) as nb_shares FROM
  memos   JOIN user_memos ON (memos.id = user_memos.memoId)
  GROUP BY memos.id;
  CREATE TEMPORARY TABLE IF NOT EXISTS non_shared 
  SELECT users.id as id,0 as nb_shares
  FROM
  users
  WHERE users.id NOT IN (SELECT * from sharers )
  GROUP BY users.id;
  SELECT users.first_name, users.last_name,count(*) as nb_shares FROM shared
  JOIN users ON (shared.id = users.id)
  GROUP BY users.id
  UNION 
  SELECT users.first_name, users.last_name,0 as nb_shares FROM non_shared
  JOIN users ON (non_shared.id = users.id)
  GROUP BY users.id;
  `
  sql ='SELECT users.first_name, users.last_name,sum(case isShared when 1 then 1 else 0 end) as value FROM user_memos JOIN memos ON (user_memos.memoId = memos.id)JOIN users ON (users.id=memos.owner)GROUP BY users.id'  
  db.query(sql).then(result =>{

    var labels=[]
    var values=[]
    for(let val of result[0])
    {
        labels.push(val['first_name']+' '+val['last_name'])
        values.push(val['value'])
    }

    var data ={
      labels:labels,
      values :values
    }
    res.send(data)
})

})

exports.getStatsData =((req,res,next)=> {
  const sql='SELECT users.first_name,users.last_name,count(memoId) AS value FROM user_memos JOIN users ON (users.id=user_memos.userId) GROUP BY userId;'
  db.query(sql).then(result =>{

    var labels=[]
    var values=[]
    for(let val of result[0])
    {
        labels.push(val['first_name']+' '+val['last_name'])
        values.push(val['value'])
    }

    var data ={
      labels:labels,
      values :values
    }
    res.send(data)
})

})

exports.getStats =((req,res,next)=> {

    res.render('admin/stats.ejs',
    {
       pageTitle :' Admin Panel ' ,
       isAuth :req.session.isLoggedIn,
       user : req.user,
       path:'/admin/stats'
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
                        return users
                  }).then(users=>{

                    const sql='select users.first_name,last_name,img_url from users where id='+memo.owner+';'
                    User.findByPk(memo.owner).then( userOwner =>{
                      res.render('../views/memo_detail.ejs',
                      {   pageTitle :'Mémos Detail !',
                          memo :memo,
                          isAuth: req.session.isLoggedIn,
                          user : req.user,
                          users :users,
                          isAdmin :req.session.isAdmin,
                          owner :userOwner,
                          path:'/admin/memos'
                      })
                    })
            

                  })

            }
        )
        .catch(err => console.log(err))


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
  res.render('edit_user.ejs',
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

