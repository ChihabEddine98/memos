const Sqlz=require('sequelize')

const db=require('../common/database')
const sequelizePaginate = require('sequelize-paginate')


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
        allowNull:true
    },
    owner : Sqlz.INTEGER

})

sequelizePaginate.paginate(Memo)

module.exports = Memo