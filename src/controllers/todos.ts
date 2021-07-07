import { RequestHandler, Request, Response, NextFunction } from 'express';
import { createTodoQuery, getTodoQuery, updateTodoQuery, deleteTodoQuery } from '../models/todo';

export const createTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const text = (req.body as { text: string }).text;

    if (!text.length) throw { status: 422, message: 'Please send valid TODO' };

    const time = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();

    const saveTodo = await createTodoQuery(text, time);
    res.status(201).send({ message: 'Created the todo.', createdTodo: saveTodo.rows[0] });

  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const getTodos: RequestHandler = async (req, res, next) => {
  try {
    const allTodos = await getTodoQuery();
    
    if (!allTodos.rows.length) throw { status: 400, message: 'No TODOS found' };

    res.status(200).json({ todos: allTodos.rows });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const updateTodo: RequestHandler<{ id: number, text: string }> = async (req, res, next) => {
  try {
    if (!req.params.id || !req.body.text || !req.body.text.length) throw { status: 422, message: 'Please send valid parameters' };

    const todoId = req.params.id;
    const updatedText = req.body.text;
    const time = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();

    const updateTodo = await updateTodoQuery(updatedText, time, todoId);

    if (updateTodo.rowCount == 0) throw { status: 400, message: 'Could not find todo!' };

    res.status(200).json({ message: 'Updated!', updatedTodo: updateTodo.rows });

  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const deleteTodo: RequestHandler<{ id: number }> = async (req, res, next) => {
  try {
    if (!req.params.id) throw { status: 422, message: 'Please send valid parameters' };
    const todoId = req.params.id;

    const deleteTodo = await deleteTodoQuery(todoId);

    if (deleteTodo.rowCount == 0) throw { status: 400, message: 'Could not find todo!' };

    res.status(200).json({ message: 'Todo deleted!' });

  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};