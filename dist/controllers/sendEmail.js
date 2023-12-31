"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer = require("nodemailer");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const user = process.env.user;
const password = process.env.pass;
// async..await is not allowed in global scope, must use a wrapper
exports.sendEmail = app.post('/sendEmail', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const info = yield transporter.sendMail({
        from: user,
        to: to,
        subject: "Dev's Message",
        text: "hi from Dev",
        html: "<b>Hello world?</b>", // html body
    });
    console.log("Message sent: %s", info.messageId);
    res.json(info);
}));
