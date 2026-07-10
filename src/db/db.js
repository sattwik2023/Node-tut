const mongoose = require('mongoose')
require('dotenv').config()

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database conneted successfully")
    }catch(err){
        console.log({"Database connection error":err})
    }

}     

module.exports = connectDB