// implementation of the api to retrieve data from database
import express from 'express';
import mongoose from "mongoose";
import router from '../router';
const app = express();
const MONGO_URL ="mongodb+srv://Devashish:Devashish@cluster0.bwlaq6l.mongodb.net/?retryWrites=true&w=majority";
const db_name = "test";
const collecton_name = "users";
mongoose.Promise=Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error',(error,Error)=>{
    console.log(error);
});
const db = mongoose.connection.useDb(db_name);
const collection = db.collection(collecton_name);

export const data = app.get('/getData', async (req : express.Request, res:express.Response) => {
    try {
      const data = await collection.find().toArray();
      res.json(data);
    } catch (error) {
      console.error('Error retrieving data:', error);
      res.status(500).send('Internal Server Error');
    }
  });