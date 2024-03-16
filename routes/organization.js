import  express  from "express";
import { addOrganization,updateOrganization,getOrganization,uploadProfileImg } from "../controller/orgController.js";
import { addUser } from "../controller/simpleUser.js";
import { authenticateOrgAdmin } from "../middleware/verifyOrgtokens.js";
import {upload} from "../middleware/multer.js";




const router=express.Router();


router.post('/Register',authenticateOrgAdmin,addOrganization)//all type of user register
router.patch('/Update/:id',authenticateOrgAdmin,updateOrganization)
router.get('/Get/:id',authenticateOrgAdmin,getOrganization);
router.post('/simpleUser',addUser);
router.post('/uploadImg',authenticateOrgAdmin,upload.single('image'),uploadProfileImg);
export default router;
