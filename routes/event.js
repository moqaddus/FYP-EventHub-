import  express  from "express";
import { addEvent,updateEvent,getAllOrganizationEvents,getSingleEvent,deleteOrganizationEvent } from "../controller/eventController.js";





const router=express.Router();


router.post('/Register',addEvent)//all type of user register
router.patch('/Update/:id',updateEvent)
router.get('/GetAllOrganizationEvents/:id',getAllOrganizationEvents)
router.get('/GetSingleEvent/:orgId/:eventId',getSingleEvent)
router.delete('/Delete/:orgId/:eventId',deleteOrganizationEvent)

export default router;
