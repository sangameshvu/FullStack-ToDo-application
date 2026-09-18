const express = require('express');
const jwt = require('jsonwebtoken');
const { createTodoZod } = require('../types');
const userAuthMiddleware = require('../middleware/userAuth');
const {userModel, todo} = require('../module/index')

const path = require('path');

require('dotenv').config({path: path.resolve(__dirname,'../.env')})
const router = express.Router();

jwt_secret = process.env.JWT_SECRET;

router.post('/addTodo',userAuthMiddleware, async (req,res)=>{
    const createPayload = req.body;
    const parsedPayload = createTodoZod.safeParse(createPayload);

    if (!parsedPayload.success) {
        res.status(411).json({
            "message":"invalid input"
        })
        return
    }
    const createTodo = await todo.create({
        title : createPayload.title,
        description : createPayload.description,
        userId : req.user.userId,
        completed : false
    })
    if(!createTodo) {
        res.status(411).json({
            "message":"Error while creating Todo"
        })
        return
    }
    res.status(200).json({
        "message":"Todo created successfully"
    })

})

router.get('/allTodos',userAuthMiddleware, async (req,res)=>{
    const allTodos = await todo.find({
        userId : req.user.userId
    })
    if(!allTodos) {
        res.status(204).json({
            "message": "No data found"
        })
        return
    }
    res.status(200).json({
        allTodos,
    })
})

router.put('/completed',userAuthMiddleware, (req,res)=>{
    const updatedTodo = req.body;
    const parsedPayload = createTodoZod.safeParse(updatedTodo);
    if(!parsedPayload.success) {
        res.status(411).json({
            "message": "you sent the wrong inputs"
        })
    }
})

module.exports = router;
