const jwt = require('jsonwebtoken')
const adminModel = require('../models/adminModel')



const authentication = async function (req, res, next) {
    try {
        
        let token = req.headers["authorization"]

        if (!token) {
            return res.status(401).send({ status: false, message: 'please provide token' })
        }
        
        let bearerToken = token.split(' ')[1]
       
        
        jwt.verify(bearerToken, 'Node.js_Task', function (err, decodedToken) {
            if (err) {
                return res.status(401).send({ status: false, message: 'please provide valid token' })
            }
           
            req.adminId = decodedToken.adminId
          //console.log(decodedToken.adminId);
           
            next()
        })

    } catch (err) {
        return res.status(500).send({ status: false, Error: err.message })
    }
}




module.exports = { authentication }



