const express =require('express')
const user = require('../controllers/user')
const router=express.Router()


router.post('/signup', user.signUp)
router.post('/Login', user.Login)


module.exports=router