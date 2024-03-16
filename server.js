import express from 'express';
import bodyParser from 'body-parser';
import { dbConnect } from './database/index.js';

import { PORT } from './config/index.js';


import userRoutes from './routes/user.js'
import orgRoutes from './routes/organization.js'
import eventRoutes from './routes/event.js'
import attendeeRouter from './routes/attendee.js';
import messageRouter from './routes/message.js';

//import fileUpload from 'express-fileupload';

const app=express();


dbConnect();
app.use(bodyParser.json());
// app.use(fileUpload({
//   useTempFiles:true
// }))

app.use('/user',userRoutes)
app.use('/Organization',orgRoutes)
app.use('/Events',eventRoutes)
app.use('/attendees', attendeeRouter);
app.use('/messages', messageRouter);



app.listen(PORT,()=>console.log(`SERVER RUNNING NOW...${PORT}`));

