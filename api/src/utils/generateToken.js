const jwt = require('jsonwebtoken');
const { SECRET }= process.env
 const generateToken = (user) => {
    return jwt.sign(
        {
            id:user.id,
            email: user.email,
            
        }, 
         SECRET, 
        {
            expiresIn: '7d'
        }
    )
};

module.exports ={
    generateToken
}