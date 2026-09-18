const express = require('express');
const todoRoute = require('./route/todo');
const authRoute = require('./route/auth');

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use('/todo',todoRoute);
app.use('/auth',authRoute);

app.listen(PORT,()=>{
    console.log(`Server is running @ PORT: ${PORT}`)
})
