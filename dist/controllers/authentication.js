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
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const users_1 = require("../db/users");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, phoneno, hobbies } = req.body;
        console.log(username, email, phoneno, hobbies);
        if (!email || !phoneno || !username || !hobbies) {
            console.log("One of the input data in empty");
            return res.sendStatus(400);
        }
        const existingUserWithEmail = yield (0, users_1.getUserByEmail)(email);
        const existingUserWithPhoneno = yield (0, users_1.getUserByPhoneno)(phoneno);
        if (existingUserWithEmail || existingUserWithPhoneno) {
            console.log("Particular email or phoneno is already registered");
            return res.sendStatus(400);
        }
        const user = yield (0, users_1.createUser)({
            username,
            email,
            phoneno,
            hobbies
        });
        return res.sendStatus(200).end();
    }
    catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});
exports.register = register;
