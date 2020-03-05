const Sqlz=require('sequelize')

const db=require('../common/database')

const Memo =db.define('memo',{
    id:{
        type:Sqlz.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull: false

    },
    title : Sqlz.STRING,
    description :Sqlz.TEXT,
    imgUrl: {
        type : Sqlz.STRING,
        allowNull:false
    }
})



module.exports = Memo