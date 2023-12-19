import express from 'express';
import {
  createMedia,
  updateMedia,
  getMedia,
  deleteMedia,
} from '../controller/mediaController.js';

const router = express.Router();

// Create Media
router.post('/create', createMedia);

// Update Media
router.patch('/update/:id', updateMedia);

// Get Media
router.get('/get/:id', getMedia);

// Delete Media
router.delete('/delete/:id', deleteMedia);

export default router;
