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
exports.deleteTodoQuery = exports.updateTodoQuery = exports.getTodoQuery = exports.createTodoQuery = void 0;
const db_1 = require("../db/db");
const dbConnection = new db_1.DatabaseConnection;
let poolConnection = dbConnection.getConnection();
const createTodoQuery = (text, time) => __awaiter(void 0, void 0, void 0, function* () {
    return yield poolConnection.query("INSERT INTO todo (text,time) VALUES($1,$2) RETURNING *", [text, time]);
});
exports.createTodoQuery = createTodoQuery;
const getTodoQuery = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield poolConnection.query("SELECT * FROM todo ORDER BY id");
});
exports.getTodoQuery = getTodoQuery;
const updateTodoQuery = (text, time, todoId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield poolConnection.query('UPDATE todo SET text = $1, time = $2 WHERE id = $3 RETURNING *', [text, time, todoId]);
});
exports.updateTodoQuery = updateTodoQuery;
const deleteTodoQuery = (todoId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield poolConnection.query("DELETE FROM todo WHERE id = $1", [todoId]);
});
exports.deleteTodoQuery = deleteTodoQuery;
