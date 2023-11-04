"use strict";
const nodemailer = require("nodemailer");
import express from 'express';
const app = express();

const user = process.env.user;
const password = process.env.pass;

// async..await is not allowed in global scope, must use a wrapper
export const sendEmail = app.post('/sendEmail',async (req:express.Request,res:express.Response)=> {
  console.log('SENDING MAIL');
  const { to } = req.body;
  console.log(to);
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
      from: user ,// sender address
      to: to, // list of receivers
      subject: "Dev's Message", // Subject line
      text: "hi from Dev", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    res.json(info);

});
  
