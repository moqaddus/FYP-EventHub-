import express from 'express';
import {
  addUserInterest,
  updateUserInterests,
  deleteUserInterest,
  getUserInterests,
} from '../controller/interestsController.js';

const router = express.Router();

// Add Interest to User
router.post('/addUserInterest', addUserInterest);

// Update User Interests
router.patch('/updateUserInterests', updateUserInterests);

// Delete User Interest
router.delete('/deleteUserInterest', deleteUserInterest);

// Get User Interests
router.get('/getUserInterests/:userID', getUserInterests);

export default router;
