import  express  from "express";
import { addEvent,updateEvent,getAllOrganizationEvents,getSingleEvent,deleteOrganizationEvent } from "../controller/eventController.js";
import { authenticateOrgAdmin } from "../middleware/verifyOrgtokens.js";




const router=express.Router();


router.post('/Register',authenticateOrgAdmin,addEvent)//all type of user register
router.patch('/Update/:id',authenticateOrgAdmin,updateEvent)
router.get('/GetAllOrganizationEvents',authenticateOrgAdmin,getAllOrganizationEvents)
router.get('/GetSingleEvent/:eventId',authenticateOrgAdmin,getSingleEvent)
router.delete('/Delete/:eventId',authenticateOrgAdmin,deleteOrganizationEvent)

export default router;
