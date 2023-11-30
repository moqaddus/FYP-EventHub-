import express from 'express';
import bodyParser from 'body-parser';
import { dbConnect } from './database/index.js';

import { PORT } from './config/index.js';


import userRoutes from './routes/user.js'

const app=express();


dbConnect();
app.use(bodyParser.json());


app.use('/users',userRoutes)

app.listen(PORT,()=>console.log('SERVER RUNNING NOW...'));