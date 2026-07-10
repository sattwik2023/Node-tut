const user_model = require("../models/users.model");
const jwk = require('jsonwebtoken')
const multer = require('multer');
// const connectCloudinary = require("../cloudinary/cloudinary");
const bcrypt = require('bcrypt')

async function postUserLoginController(req, res) {
    try {
        const {email,password} = req.body ;
        const isValideUser = await user_model.findOne({email: req.body.email});
        // console.log(isValideUser);
        const isValidePasswod = isValideUser && isValideUser.password ? await bcrypt.compare(password , isValideUser.password) : false;
        // console.log("isValidePasswod",isValidePasswod);
        
        if (isValideUser == null || !isValidePasswod) {
           return res.status(401).json({
                "message": "Invalid email or password!!!"
            })
        }
        const token = jwk.sign({
            id: isValideUser._id, email: isValideUser.email
        }, process.env.JWK_SECRET);
        res.cookie('authToken', token)

        return res.status(200).json({
            "message": "User login successfully",
            userData: isValideUser
        })
    } catch (error) {
        res.status(404).json({
            "message": "Get data connection error ",
            error:error
        })
    }
}

async function getUserDataController(req, res) {
    try {
        const userData = await user_model.findOne({
            _id: req.params.id
        });

        // const token = jwk.sign({
        //     id: userData._id, email: userData.email
        // }, process.env.JWK_SECRET);
        // res.cookie('authToken', token)

        res.render('userprofile',{
            "message": "Get the user data successfully",
            userData
        })
    } catch (error) {
        res.status(404).json({
            "message": "Get data connection error ",
            error
        })
    }
}

async function postRegistationController(req, res) {
    try {
        const { user_name, email, age, password } = req.body;

        console.log("reqbody", req.body)
        console.log("filename", req.file)
        // const cloudinay_url = await connectCloudinary(req.file.path)
        // console.log("cloudinay_url",cloudinay_url)
        // res.json({
        //     cloudinay_url
        // })

        // const UploadImgpath = `${req.file.destination}${req.file.filename}`
        const UploadImgpath = req.file ? `/upload/${req.file.filename}` :null

        const hashPasaword = bcrypt.hash(req.body.password, 10)

        const userData = await user_model.create({
            user_name,
            email,
            age,
            password: (await hashPasaword).toString(),
            img_url: UploadImgpath
        })
        res.status(200).json({
            "message": "User data created successfully",
            userData
        })
    } catch (error) {
        res.status(401).json({
            "message": "Ïnternal Server Error",
            "errors": error
        })
    }
}

module.exports = { postUserLoginController, getUserDataController, postRegistationController }