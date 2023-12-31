"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const router_1 = __importDefault(require("./router"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true
}));
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
// Use built-in middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const port = 8080;
const server = http_1.default.createServer(app);
server.listen(8080, () => {
    console.log("Server running");
});
//initializers data for database
const MONGO_URL = process.env.MONGO_URL;
const db_name = process.env.db_name;
const collecton_name = process.env.collection_name;
if (!MONGO_URL) {
    throw new Error('MONGO_URL is not defined in the environment variables.');
}
mongoose_1.default.Promise = Promise;
mongoose_1.default.connect(MONGO_URL);
mongoose_1.default.connection.on('error', (error, Error) => {
    console.log(error);
});
app.use('/', (0, router_1.default)());
