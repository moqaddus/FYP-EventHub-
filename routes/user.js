import  express  from "express";
import {register,login,updateCommonUser,getAllUsers} from '../controller/authController.js';
//import { authenticateUser } from "../middleware/verifytoken.js";
import { authenticatePlatfromUser } from "../middleware/verifyPlatformUser.js";
//import {addNewOrg} from '../controller/orgController.js';
import { addNewUser,updateUser,deleteUser,getOneUser } from "../controller/userController.js";
import {v4 as uuidv4 } from 'uuid';
uuidv4();

const router=express.Router();

///THESE ARE BEING USED FOR PLATFORM_USER.
router.post('/register',register)//all type of user register.
router.post('/login',login)//all type of user login.
router.get('/users',getAllUsers)
router.patch('/update/user',authenticatePlatfromUser,updateUser)//update platform user
router.delete('/delete/user',authenticatePlatfromUser,deleteUser)//delete platform user 
router.get('/profile/user',authenticatePlatfromUser,getOneUser) //get one platform user
router.post('/register/user',authenticatePlatfromUser,addNewUser)//register Platform user

export default router;