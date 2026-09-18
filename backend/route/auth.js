const express = require('express');
const jwt = require('jsonwebtoken');

const userAuthMiddleware = require('../middleware/userAuth');
const { user, todo } = require('../module/index')
const { authZod } = require('../types')
const path = require('path');

require('dotenv').config({path: path.resolve(__dirname,'../.env')})
const router = express.Router();

jwt_secret = process.env.JWT_SECRET;

router.post('/signin',async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const exists = await user.findOne({
        username : username,
        password : password
    })
    if(!exists) {
        res.status(411).json({
            "message":"Invalid username/password"
        });
        return
    }
    const jwtToken = jwt.sign({
        username : exists.username,
        userId : exists._id
    },jwt_secret)
    res.status(200).json({
        "Message": "Valid",
        "token": jwtToken
    })
})

router.post('/signup',async (req,res)=> {
    const userPayload = req.body;
    const parsedPayload = authZod.safeParse(userPayload);
    if(!parsedPayload) {
        res.status(409).json({
            "message":"enter proper input"
        })
        return
    }
    const exists = await user.findOne({
        username : userPayload.username,
        password : userPayload.password
    })
    if(exists) {
        res.status(409).json({
            "message" : "user already exists"
        })
        return
    }
    const newUser = await user.create({
        username : userPayload.username,
        password : userPayload.password
    })
    console.log(newUser);
    if (newUser) {
        res.status(200).json({
        "message": "new user created"
        })
    }
})

module.exports = router;
