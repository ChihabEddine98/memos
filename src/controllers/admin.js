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

exports.getSharedStatsData =((req,res,next)=> {
  const db=require('../common/database')
  const sql='select users.first_name,users.last_name,sum(case isShared when 1 then 1 else 0 end) as nb_shares FROM user_memos JOIN users ON (users.id=user_memos.userId) GROUP BY userId'


  db.query(sql).then(result =>{
    var labels=[]
    var values=[]
    for(let user of result[0])
    {
      labels.push(user['first_name']+' '+user['last_name'])
      values.push(user['nb_shares'])
    }

    var data ={
      labels:labels,
      values :values
    }
    res.send(data)

  })

})
exports.getStatsData =((req,res,next)=> {
 
 
  const db=require('../common/database')

  const sql='SELECT users.first_name,users.last_name,count(memoId) AS nb_memos FROM user_memos JOIN users ON (users.id=user_memos.userId) GROUP BY userId;'

  db.query(sql).then(result =>{

    var labels=[]
    var values=[]
    for(let user of result[0])
    {
      labels.push(user['first_name']+' '+user['last_name'])
      values.push(user['nb_memos'])
    }

    var data ={
      labels:labels,
      values :values
    }
    res.send(data)
  })

})
exports.getStats =((req,res,next)=> {


  data= [{
      'x': 0.2,
      'y': 0.4
  }, {
      'x': 0.5,
      'y': -0.3
  }]

  options= {
    scales: {
        yAxes: [{
            stacked: true
        }]
    }
   }

    res.render('admin/stats.ejs',
    {
       pageTitle :' Admin Panel ' ,
       isAuth :req.session.isLoggedIn,
       user : req.user,
       data : data,
       options :options,
      


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