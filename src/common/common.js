const User=require('../models/User')
const bcrypt=require('bcryptjs')

exports.userFullName = ((userId)=> {
                    User.findByPk(userId)
                        .then(user=>{
                            return user.first_name+' '+user.last_name
                        })
                    
                } )

exports.ITEMS_PER_PAGE=3


exports.createAdmin= function (){
    bcrypt
          .hash('admin', 12)
          .then(hashedPass => {
          
            const imgUrl ='admin.JPG'
            const admin = new User({
              email: 'admin@esi.dz',
              password: hashedPass,
              first_name: 'Chihab',
              last_name:'Benamara',
              img_url :imgUrl,
              role : 'ADMIN',
              sexe : 'm'
            });
            return admin.save()
          })
}