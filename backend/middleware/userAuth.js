const jwt = require('jsonwebtoken');
const path = require('path')

require('dotenv').config({path:path.resolve(__dirname, '../.env')})

const JWT_SECRET = process.env.JWT_SECRET;

function userAuthMiddleware(req,res,next){
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            "message":"Authentication required"
        });
    }
    const token_ = token.split(' ')
    if (token_[0] != 'Bearer' || !token_[1]){
        return res.status(403).json({
            "message":"invalid header configuration"
        })
    } else {
        let decoded;
        try {
            decoded = jwt.verify(token_[1],JWT_SECRET);
        } catch (error) {
            return res.status(403).json({
                "message":"Not authorized"
            });
        }

        if(!decoded) {
            return res.status(403).json({
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
