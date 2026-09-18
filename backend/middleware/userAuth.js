const jwt = require('jsonwebtoken');
const path = require('path')

require('dotenv').config({path:path.resolve(__dirname, '../.env')})

const JWT_SECRET = process.env.JWT_SECRET;

function userAuthMiddleware(req,res,next){
    const token = req.headers.authorization;
    const token_ = token.split(' ')
    if (token_[0] != 'Bearer'){
        res.status(403).json({
            "message":"invalid header configuration"
        })
    } else {
        jwtToken = token_[1]
        decoded = jwt.verify(jwtToken,JWT_SECRET);

        if(!decoded) {
            res.status(403).json({
                "message":"Not authorized"
            })
        }
        req.user = {
            username :decoded.username,
            userId : decoded.userId
        };
        next();
    }
}

module.exports = userAuthMiddleware;
