"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = require("../controllers/authentication");
const express_1 = require("express");
const router = (0, express_1.Router)();
const getData_1 = require("../controllers/getData");
const sendEmail_1 = require("../controllers/sendEmail");
const sendData_1 = require("../controllers/sendData");
const deleteData_1 = require("../controllers/deleteData");
const updateRow_1 = require("../controllers/updateRow");
exports.default = (router) => {
    router.post('/auth/register', authentication_1.register);
    router.get('/getData', getData_1.data);
    router.post('/sendEmail', sendEmail_1.sendEmail);
    router.post('/sendData', sendData_1.sendData);
    router.post('/deleteData', deleteData_1.deleteData);
    router.post('/updateRow', updateRow_1.updateRow);
};
