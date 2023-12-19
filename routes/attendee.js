import express from 'express';
import { getAttendeesForEvent,postReviewAndRating } from '../controller/attendeeController.js'; // Adjust the path accordingly

const router = express.Router();

// Route to get all attendees for a specific event
router.get('/event/:eventId', getAttendeesForEvent);
router.post('/post-review', postReviewAndRating);

// Export the router
export default router;
