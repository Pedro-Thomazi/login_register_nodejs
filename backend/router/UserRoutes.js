const UserController = require('../controller/UserController')

const router = require('express').Router()

router.post('/register', UserController.registerUser)
router.post('/login', UserController.loginUser)
router.patch('/update-user/:id', UserController.updateUser)
router.get('/allusers', UserController.getAllUsers)
router.get('/getuser', UserController.getUser)

module.exports = router