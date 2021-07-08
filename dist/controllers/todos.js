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
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const todo_1 = require("../models/todo");
const createTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const text = req.body.text;
        if (!text.length)
            throw { status: 422, message: 'Please send valid TODO' };
        const time = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
        const saveTodo = yield todo_1.createTodoQuery(text, time);
        res.status(201).send({ message: 'Created the todo.', createdTodo: saveTodo.rows[0] });
    }
    catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});
exports.createTodo = createTodo;
const getTodos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTodos = yield todo_1.getTodoQuery();
        if (!allTodos.rows.length)
            throw { status: 400, message: 'No TODOS found' };
        res.status(200).json({ todos: allTodos.rows });
    }
    catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});
exports.getTodos = getTodos;
const updateTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params.id || !req.body.text || !req.body.text.length)
            throw { status: 422, message: 'Please send valid parameters' };
        const todoId = req.params.id;
        const updatedText = req.body.text;
        const time = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
        const updateTodo = yield todo_1.updateTodoQuery(updatedText, time, todoId);
        if (updateTodo.rowCount == 0)
            throw { status: 400, message: 'Could not find todo!' };
        res.status(200).json({ message: 'Updated!', updatedTodo: updateTodo.rows });
    }
    catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params.id)
            throw { status: 422, message: 'Please send valid parameters' };
        const todoId = req.params.id;
        const deleteTodo = yield todo_1.deleteTodoQuery(todoId);
        if (deleteTodo.rowCount == 0)
            throw { status: 400, message: 'Could not find todo!' };
        res.status(200).json({ message: 'Todo deleted!' });
    }
    catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});
exports.deleteTodo = deleteTodo;
