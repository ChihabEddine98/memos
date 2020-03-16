const Sqlz=require('sequelize')

const DB_NAME ='memos'
const DB_USER ='root'
const DB_PWD  =''

const db=new Sqlz(DB_NAME,DB_USER,DB_PWD,
    {
        dialect: 'mysql',
        host:'localhost'
    }
)

module.exports = db;