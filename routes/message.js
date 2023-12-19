import express from 'express';
import { createMessage ,getMessagesForChat} from '../controller/messageController.js';

const router = express.Router();

// Route to create a new message
router.post('/create', createMessage);
router.get('/chat/:chatId', getMessagesForChat);

// Export the router
export default router;
