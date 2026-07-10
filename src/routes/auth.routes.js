const express = require('express')
const router = express.Router()
const authcontroller = require('../controllers/auth.controllers')
const multer = require('multer')

router.get('/',(req,resp)=>{
    resp.render('login.ejs')
})
router.post('/login', authcontroller.postUserLoginController)
router.get('/loginuser/:id', authcontroller.getUserDataController)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/upload/')
    },
    filename: function (req, file, cb) {
        const uploadfilename = Date.now()+file.originalname;
        cb(null, uploadfilename)
    }
})
// const storage = multer.diskStorage({});
const upload = multer({
    storage: storage
})
router.get('/registation',(req,resp)=>{
    resp.render('registation.ejs')
})

router.post('/postregistation',upload.single('img'),authcontroller.postRegistationController)
// router.post('/registation',upload.none(), authcontroller.postRegistationController)

module.exports = router