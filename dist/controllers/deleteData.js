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
exports.deleteData = void 0;
const users_1 = require("../db/users");
const deleteData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        console.log(id);
        if (!id) {
            console.log("input data in empty");
            return res.sendStatus(400);
        }
        const deleteWithId = yield (0, users_1.deleteUserById)(id);
        return res.sendStatus(200).end();
    }
    catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});
exports.deleteData = deleteData;
