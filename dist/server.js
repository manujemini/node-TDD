"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db_1 = require("./db/db");
const dbConnection = new db_1.DatabaseConnection;
dbConnection.connect();
const app = require("./app");
app.listen(3000, () => {
    console.log("Server Started...");
});
