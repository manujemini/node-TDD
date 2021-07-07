import { DatabaseConnection } from "../db/db";
const dbConnection = new DatabaseConnection;
let poolConnection = dbConnection.getConnection();

export const createTodoQuery = async (text: string, time: string) => {
   return await poolConnection.query(
    "INSERT INTO todo (text,time) VALUES($1,$2) RETURNING *",
    [text, time]
  );
}

export const getTodoQuery = async () => {
  return await poolConnection.query("SELECT * FROM todo ORDER BY id");
}

export const updateTodoQuery = async (text: string, time: string, todoId: number) => {
  return await poolConnection.query(
    'UPDATE todo SET text = $1, time = $2 WHERE id = $3 RETURNING *',
    [text, time, todoId]
  );
}

export const deleteTodoQuery = async (todoId: number) => {
  return await poolConnection.query("DELETE FROM todo WHERE id = $1",
    [todoId]);
}