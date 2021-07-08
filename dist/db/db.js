"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnection = void 0;
const pg_1 = require("pg");
const USER = process.env.DB_USER || "postgres";
const PASSWORD = process.env.DB_PW || "postgres";
const HOSTNAME = process.env.DB_HOST || "localhost";
const PORT = parseInt(process.env.DB_PORT) || 5432;
const DATABASE_NAME = process.env.DB_NAME || "task_tracker";
class DatabaseConnection {
    constructor() {
        this.pool = new pg_1.Pool({
            user: USER,
            password: PASSWORD,
            host: HOSTNAME,
            port: PORT,
            database: DATABASE_NAME,
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000
        });
    }
    getConnection() {
        return this.pool;
    }
    connect() {
        this.pool.connect((err, client, release) => {
            if (err) {
                return console.error('Error acquiring client', err.stack);
            }
            console.log(`Connected to '${DATABASE_NAME}' on port '${PORT}' at host '${HOSTNAME}'`);
        });
    }
}
exports.DatabaseConnection = DatabaseConnection;
