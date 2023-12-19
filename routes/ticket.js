import express from 'express';
import { createTicketAndAttendee } from '../controller/ticketController.js'; // Adjust the path accordingly

const router = express.Router();

// Route to create a new ticket and attendee
router.post('/create', createTicketAndAttendee);

// Export the router
export default router;
