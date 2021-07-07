import { DatabaseConnection } from "./db/db";
const dbConnection = new DatabaseConnection;
dbConnection.connect();

const app = require("./app");

app.listen(3000, () => {
    console.log("Server Started...")
  });