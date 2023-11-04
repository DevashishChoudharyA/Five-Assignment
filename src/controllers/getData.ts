// implementation of the api to retrieve data from database
import express from 'express';
import mongoose from "mongoose";
import router from '../router';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const MONGO_URL =process.env.MONGO_URL;
const db_name = process.env.db_name;
const collection_name = process.env.collection_name;
console.log(MONGO_URL,db_name,collection_name);
if (!MONGO_URL || !db_name || !collection_name) {
  throw new Error('One or more required environment variables are not defined.');
}
mongoose.Promise=Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error',(error,Error)=>{
    console.log(error);
});
const db = mongoose.connection.useDb(db_name);
const collection = db.collection(collection_name);

export const data = app.get('/getData', async (req : express.Request, res:express.Response) => {
    try {
      const data = await collection.find().toArray();
      res.json(data);
    } catch (error) {
      console.error('Error retrieving data:', error);
      res.status(500).send('Internal Server Error');
    }
  });