import express from 'express';
import bodyParser from 'body-parser';
import { dbConnect } from './database/index.js';
import { PORT } from './config/index.js';
import userRoutes from './routes/user.js';
import mediaRoutes from './routes/media.js'; // Update the path based on your actual file structure
import InterestRoutes from './routes/interest.js'; 
const app = express();

// Connect to the database
dbConnect();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Use the user routes under the '/users' endpoint
app.use('/users', userRoutes);

// Use the media routes under the '/media' endpoint
app.use('/media', mediaRoutes);
app.use('/interest', InterestRoutes);

app.listen(PORT, () => console.log('SERVER RUNNING NOW...'));
