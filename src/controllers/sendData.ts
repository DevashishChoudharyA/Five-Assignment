"use strict";
const nodemailer = require("nodemailer");
import express from 'express';
const app = express();

// async..await is not allowed in global scope, must use a wrapper
export const sendData = app.post('/sendData',async (req:express.Request,res:express.Response)=> {
  console.log('SENDING MAIL FOR ROWS AND COLUMNS');
  const { data } = req.body;
  console.log(data);
      const transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          auth: {
              user: 'uriel.runte71@ethereal.email',
              pass: 'eQhGpaAsUxy2MMdBpU'
          }
      });
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: 'uriel.runte71@ethereal.email', // sender address
      to: "anyemail@mail.com"   , // list of receivers
      subject: "Dev's Message", // Subject line
      text: data, // plain text body
      html: "<b>Hello world?</b>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    res.json(info);

});
  
