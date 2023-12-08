import  express  from "express";
import {register,login} from '../controller/authController.js';
//import {addNewOrg} from '../controller/orgController.js';
import { addNewUser,updateUser,getOneUser,deleteUser } from "../controller/userController.js";
import {v4 as uuidv4 } from 'uuid';
uuidv4();

const router=express.Router();


router.post('/register',register)//all type of user login
router.post('/login',login)//all type of user register
//router.post('/register/organization/:id',addNewOrg)//adding new organization
router.post('/register/user/:id',addNewUser)//regiater Platfomr user
router.patch('/user/:id',updateUser)//update platform user
router.delete('/:id',deleteUser)//delete platform user
router.get('/:id',getOneUser)//get one platfrom user.

/*
router.post('/',(req,res)=>{
  const user=req.body;
  const userWithId={...user,id:uuidv4()}
  users.push(userWithId);
  res.send('user added');
})
*/

export default router;