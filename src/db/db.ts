import { Pool, PoolClient } from 'pg';

const USER = process.env.DB_USER || "postgres";
const PASSWORD = process.env.DB_PW || "postgres";
const HOSTNAME = process.env.DB_HOST || "localhost";
const PORT = parseInt(process.env.DB_PORT!) || 5432;
const DATABASE_NAME = process.env.DB_NAME || "task_tracker";


interface dbConnection {
    pool: Pool,
    getConnection: () => Pool,
    connect: () => void
}

export class DatabaseConnection implements dbConnection {

    public pool: Pool;

    constructor() {
        this.pool = new Pool({
            user: USER,
            password: PASSWORD,
            host: HOSTNAME,
            port: PORT,
            database: DATABASE_NAME,
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000
        })
    }

    getConnection() {
        return this.pool;
    }

    connect() {
        this.pool.connect((err: Error, client: PoolClient, release: any) => {
            if (err) {
                return console.error('Error acquiring client', err.stack)
            }
            console.log(`Connected to '${DATABASE_NAME}' on port '${PORT}' at host '${HOSTNAME}'`)
        })
    }
}