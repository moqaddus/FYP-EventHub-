import  express  from "express";
import {v4 as uuidv4 } from 'uuid';
uuidv4();

const router=express.Router();


const users=[
  
]


router.get('/',(req,res)=>{
  res.send(users);
})

router.post('/',(req,res)=>{
  const user=req.body;
  const userWithId={...user,id:uuidv4()}
  users.push(userWithId);
  res.send('user added');
})

export default router;