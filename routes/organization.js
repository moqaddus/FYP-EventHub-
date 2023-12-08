import  express  from "express";
import { addOrganization,updateOrganization,getOrganization } from "../controller/orgController.js";
import { addUser } from "../controller/simpleUser.js";




const router=express.Router();


router.post('/Register',addOrganization)//all type of user register
router.patch('/Update/:id',updateOrganization)
router.get('/Get/:id',getOrganization);
router.post('/simpleUser',addUser);

export default router;
