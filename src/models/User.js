const Sqlz=require('sequelize')
const db=require('../common/database')
const sequelizePaginate = require('sequelize-paginate')


const User=db.define('user',{
    
    id:{
        type: Sqlz.INTEGER,
        primaryKey: true,
        allowNull : false,
        autoIncrement : true
    },
    first_name :Sqlz.STRING,
    last_name : Sqlz.STRING,
    email : Sqlz.STRING(255),
    password: Sqlz.STRING(512),
    img_url :Sqlz.STRING(300) ,
    role:Sqlz.STRING,
    sexe : Sqlz.STRING

})
sequelizePaginate.paginate(User)


module.exports = User
