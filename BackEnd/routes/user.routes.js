const express = require('express');
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth');  

const userRouter = express.Router();

userRouter.post('/registeruser',userController.registerUser);
userRouter.post('/login', userController.loginUser);
userRouter.post('/logout', auth.verifyToken, userController.logoutUser); 
userRouter.get('/getuser/:email', auth.verifyToken, userController.getUser); 
userRouter.delete('/delete/:email', auth.verifyToken, userController.deleteUser); 

//Tested with postman and working all

module.exports = userRouter;