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
exports.data = void 0;
// implementation of the api to retrieve data from database
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const MONGO_URL = "mongodb+srv://Devashish:Devashish@cluster0.bwlaq6l.mongodb.net/?retryWrites=true&w=majority";
const db_name = "test";
const collecton_name = "users";
mongoose_1.default.Promise = Promise;
mongoose_1.default.connect(MONGO_URL);
mongoose_1.default.connection.on('error', (error, Error) => {
    console.log(error);
});
const db = mongoose_1.default.connection.useDb(db_name);
const collection = db.collection(collecton_name);
exports.data = app.get('/getData', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield collection.find().toArray();
        res.json(data);
    }
    catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).send('Internal Server Error');
    }
}));
