const Memo=require('../models/Memo')
const User=require('../models/User')
const Sqlz=require('sequelize')
const db=require('../common/database')


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
                    res.render('../views/memos.ejs',
                    { pageTitle :'Mémos !',
                      memos:memos,
                      isAuth: req.session.isLoggedIn,
                      canShare:false,
                      user : req.user,
                      isAdmin :req.session.isAdmin
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
                  isAdmin :req.session.isAdmin
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