const Sqlz=require('sequelize')
const db=require('../common/database')
const sequelizePaginate = require('sequelize-paginate')


const User_Memo=db.define('user_memo',{
    isShared :{
        type :Sqlz.BOOLEAN,
        defaultValue : false,
        allowNull :false
    }
})

sequelizePaginate.paginate(User_Memo)

module.exports=User_Memo