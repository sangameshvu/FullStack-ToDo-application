const express = require('express');
const jwt = require('jsonwebtoken');

const { user } = require('../module/index')
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
    if(!parsedPayload.success) {
        res.status(409).json({
            "message": parsedPayload.error.issues[0]?.message || "Enter valid signup details"
        })
        return
    }
    const exists = await user.findOne({
        username : userPayload.username
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
