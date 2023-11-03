import express from 'express';
import { createUser, getUserByEmail , getUserByPhoneno } from '../db/users';

export const register = async(req:express.Request,res:express.Response)=>{
    try {
        const {username , email , phoneno , hobbies} = req.body;
        console.log(username , email , phoneno , hobbies);
        if(!email || !phoneno || !username || !hobbies) {
            console.log("One of the input data in empty")
            return res.sendStatus(400);
        } 

        const existingUserWithEmail = await getUserByEmail(email);
        const existingUserWithPhoneno = await getUserByPhoneno(phoneno);
        if(existingUserWithEmail || existingUserWithPhoneno) {
            console.log("Particular email or phoneno is already registered");
            return res.sendStatus(400);
        }


        const user = await createUser({
            username,
            email,
            phoneno,
            hobbies
        });         

        return res.sendStatus(200).end();

    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}