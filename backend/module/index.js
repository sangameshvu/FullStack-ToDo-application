const mongoose = require('mongoose');

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const mongodb_url = process.env.MONGODB_URL;
mongoose.connect(mongodb_url).then(()=>{
    console.log('DB connected successfully');
}).catch((err)=>{
    console.log(`error while connecting: ${err}`)
});

const userSchema = mongoose.Schema({
    username : String,
    password : String,
});

const todoSchema = mongoose.Schema({
    title : String,
    description : String,
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    completed: Boolean
});

const user = mongoose.model("user",userSchema);
const todo = mongoose.model("todo", todoSchema);

module.exports =  {
    user,
    todo
}
