"use strict";
const nodemailer = require("nodemailer");
import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();

const user = process.env.user;
const password = process.env.pass;
const toMail = process.env.toMail;
// async..await is not allowed in global scope, must use a wrapper
export const sendData = app.post('/sendData',async (req:express.Request,res:express.Response)=> {
  console.log('SENDING MAIL FOR ROWS AND COLUMNS');
  const { data } = req.body;
  console.log(data);
      const transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          auth: {
              user: user,
              pass: password
          }
      });
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: user, // sender address
      to: toMail   , // list of receivers
      subject: "Dev's Message", // Subject line
      text: data, // plain text body
      html: "<b>Hello world?</b>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    res.json(info);

});
  
