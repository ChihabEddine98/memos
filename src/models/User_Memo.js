const Sqlz=require('sequelize')
const db=require('../common/database')


const User_Memo=db.define('User_Memo',{
    isShared :{
        type :Sqlz.BOOLEAN,
        defaultValue : false,
        allowNull :false
    }
})

module.exports=User_Memo