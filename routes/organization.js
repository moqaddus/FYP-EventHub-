import  express  from "express";
import { addOrganization,updateOrganization,getOrganization } from "../controller/orgController.js";
import { addUser } from "../controller/simpleUser.js";
import { authenticateOrgAdmin } from "../middleware/verifyOrgtokens.js";




const router=express.Router();


router.post('/Register',authenticateOrgAdmin,addOrganization)//all type of user register
router.patch('/Update/:id',authenticateOrgAdmin,updateOrganization)
router.get('/Get/:id',authenticateOrgAdmin,getOrganization);
router.post('/simpleUser',addUser);

export default router;
