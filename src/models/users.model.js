const mongoose = require('mongoose')
const connectDB = require('../db/db')

connectDB()
const user_schama = new mongoose.Schema({
    'user_name':{
        type:String,
        require:[true , 'User Name is Mandatory']
    },
    email:{
        type:String,
        require:[true,'Email is madatory'],
        unique:true
    },
    age:{
        type:Number,
        min:18,
        max:120,
        default:18
    },
    password:{
        type:String,
        require:true
    },
    img_url:{
        type:String
    },
    roles:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    isActive:{
        type:Boolean,
        default:true
    }
},{timestamps:true});

const user_model = mongoose.model('users',user_schama)

module.exports = user_model;    