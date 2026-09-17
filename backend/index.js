const express = require('express');

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') })
const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.get('/',(req,res)=>{
    res.status(200).json({
        "message": 'hii there'
    })
})

app.listen(PORT,()=>{
    console.log(`Server is running @ PORT: ${PORT}`)
})
