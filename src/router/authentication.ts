import express from 'express';
import { register } from '../controllers/authentication';
import { Router } from 'express';
const router = Router();
import {data} from '../controllers/getData';
import { sendEmail } from '../controllers/sendEmail';
import { sendData } from '../controllers/sendData';
import { deleteData } from '../controllers/deleteData';

export default(router:express.Router)=>{
    router.post('/auth/register',register);
    router.get('/getData',data);
    router.post('/sendEmail',sendEmail);
    router.post('/sendData',sendData);
    router.post('/deleteData',deleteData);
}