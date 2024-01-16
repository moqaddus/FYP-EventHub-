import express from 'express';
import {
  updateUserInterests,
  addUserInterest,
  deleteUserInterest,
  getAllUserInterests,
  getUserInterestById,
} from '../controller/interestsController.js';

const router = express.Router();

// Update user interests
router.patch('/update', updateUserInterests);

// Add user interest
router.post('/add', addUserInterest);

// Delete user interest
router.delete('/delete', deleteUserInterest);

// Get all user interests
router.get('/getAll/:userID', getAllUserInterests);

// Get user interest by ID
router.get('/get/:userID/:interestID', getUserInterestById);

export default router;
