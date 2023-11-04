import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import http from 'http';
import mongoose from 'mongoose';
import router from './router';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors({
    credentials:true
}));
app.use(compression());
app.use(cookieParser());
// Use built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 8080;
const server = http.createServer(app);

server.listen(8080,()=> {
    console.log("Server running");
});

//initializers data for database
const MONGO_URL = process.env.MONGO_URL;
const db_name = process.env.db_name;
const collecton_name = process.env.collection_name;
if (!MONGO_URL) {
    throw new Error('MONGO_URL is not defined in the environment variables.');
  }
mongoose.Promise=Promise;
mongoose.connect(MONGO_URL);

mongoose.connection.on('error',(error,Error)=>{
    console.log(error);
});



app.use('/',router());