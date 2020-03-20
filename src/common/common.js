const User=require('../models/User')


exports.userFullName = ((userId)=> {
                    User.findByPk(userId)
                        .then(user=>{
                            return user.first_name+' '+user.last_name
                        })
                    
                } )