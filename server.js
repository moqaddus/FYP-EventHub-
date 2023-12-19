import express from 'express';
import bodyParser from 'body-parser';
import { dbConnect } from './database/index.js';

import { PORT } from './config/index.js';


import userRoutes from './routes/user.js'
import orgRoutes from './routes/organization.js'
import eventRoutes from './routes/event.js'
import ticketRoutes from './routes/ticket.js'
import attendeeRouter from './routers/attendee.js';
import messageRouter from './routers/message.js';

const app=express();


dbConnect();
app.use(bodyParser.json());


app.use('/user',userRoutes)
app.use('/Organization',orgRoutes)
app.use('/Events',eventRoutes)
app.use('/tickets',ticketRoutes)
app.use('/attendees', attendeeRouter);
app.use('/messages', messageRouter);



app.listen(PORT,()=>console.log(`SERVER RUNNING NOW...${PORT}`));