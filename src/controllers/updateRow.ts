import express from 'express';
import { updateUserById ,getUserByEmail,getUserByPhoneno} from '../db/users';
const app = express();

export const updateRow = app.post('/updateRow',async(req:express.Request,res:express.Response)=>{
    try {
        const {id ,username , email , phoneno , hobbies} = req.body;
        console.log(id, username , email , phoneno , hobbies);
        if(!id || !email || !phoneno || !username || !hobbies) {
            console.log("One of the input data in empty")
            return res.sendStatus(400);
        } 

        const existingUserWithEmail = await getUserByEmail(email);
        const existingUserWithPhoneno = await getUserByPhoneno(phoneno);
        if(existingUserWithEmail || existingUserWithPhoneno) {
            console.log("Particular email or phoneno is already registered");
            return res.sendStatus(400);
        }


        const user = await updateUserById(id,{
            username,
            email,
            phoneno,
            hobbies
        });         

        return res.sendStatus(200).end();

    } catch (error) {
        console.log('aught an error');
        console.log(error);
        res.sendStatus(400);
    }
});