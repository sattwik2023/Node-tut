const express = require('express')
// const user_model = require('./src/models/users.model')
// const bodyParser = require('body-parser');
const cors = require('cors')
const authroutes = require('./src/routes/auth.routes')
const cookieparser = require('cookie-parser')
const path = require("path");

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs");
// app.set("views", "./src/public/views");
app.set("views", path.join(__dirname,"src","public","views"));
// app.use(express.static("public"))
app.use(express.static(path.join(__dirname, "src/public")));
// Parse application/json
// app.use(bodyParser.json());

// // Parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())
app.use(cookieparser())
// app.use('/api/auth',authroutes)
app.use('/',authroutes)

// app.post('/create_user',async (req,res)=>{
//     try{
//         // const data = req.body()
//         const newuser= new user_model(req.body)
//         const saveuser = await newuser.save()
//         res.status(201).json({
//             'msg':"new user created successfull",
//             saveuser
//         })
//     }
//     catch(error){
//         res.status(400).json({
//             'msg': 'post error '+error
//         })
//     }

// })
// app.get('/get_user',async (req,res)=>{
//     try{

//         // const data = req.body()
//         const userdata = await user_model.find()
    
//         res.status(200).json({
//             'msg':"Get user data successfully",
//             userdata
//         })
//     }catch(error){
//         res.status(400).json({
//             'msg': 'get error '+error
//         })
//     }

// })

module.exports = app