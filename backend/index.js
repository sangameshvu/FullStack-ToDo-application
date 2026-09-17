const express = require('express')
const path = require('path');
require('dotenv').config('__dir')
const app = express();

const PORT = 3000;

app.use(express.json());

app.use('/user',userRoute);
