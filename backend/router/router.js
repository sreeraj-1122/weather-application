const express=require('express')
const registerUser = require('../Controllers/userRegister')
const loginFunction = require('../Controllers/userLogin')
const saveFunction = require('../Controllers/saveLocation')
const AuthMiddleware = require('../Middleware/Token')
const getLocationData = require('../Controllers/getLocation')
const router=express.Router()
const authMiddleware=[AuthMiddleware]
router.route('/register').post(registerUser)
router.route('/login').post(loginFunction)
router.route('/save').post(authMiddleware,saveFunction)
router.route('/save/:id').get(authMiddleware,getLocationData)
router.route('/delete/:name').delete(authMiddleware,getLocationData)
module.exports=router
