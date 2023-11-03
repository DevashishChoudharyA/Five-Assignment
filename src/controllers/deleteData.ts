import express from 'express';
import {getUserById,deleteUserById} from '../db/users';

export const deleteData = async(req:express.Request,res:express.Response)=>{
    try {
        const {id} = req.body;
        console.log(id);
        if(!id) {
            console.log("input data is empty");
            return res.sendStatus(400);
        } 

        const deleteWithId = await deleteUserById(id);        

        return res.sendStatus(200).end();

    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}