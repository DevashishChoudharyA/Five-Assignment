// difference between schema and model
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username : {type : String , required : true}, 
    email: {type : String , required : true},
    phoneno:{type : String , required : true},
    hobbies:{type : String , required : true}
});

export const UserModel = mongoose.model('User',UserSchema);

export const getUsers = ()=> UserModel.find();
export const getUserByEmail = (email:string)=> UserModel.findOne({email:email});
export const getUserById = (id:String)=> UserModel.findById({_id : id});
export const createUser = (values : Record<string,any>) =>new UserModel(values).save().then((user)=> user.toObject());

export const getUserByPhoneno =(phoneno:string)=>UserModel.findOne({phoneno:phoneno});
export const deleteUserById = (id:string)=> UserModel.findByIdAndDelete({_id:id});
export const updateUserById = (id : string , values : Record<string,any>) => UserModel.findByIdAndUpdate(id,values);