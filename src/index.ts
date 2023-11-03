import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import http from 'http';
import mongoose from 'mongoose';
import router from './router';

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
const MONGO_URL ="mongodb+srv://Devashish:Devashish@cluster0.bwlaq6l.mongodb.net/?retryWrites=true&w=majority";
const db_name = "test";
const collecton_name = "users";
mongoose.Promise=Promise;
mongoose.connect(MONGO_URL);

mongoose.connection.on('error',(error,Error)=>{
    console.log(error);
});



app.use('/',router());