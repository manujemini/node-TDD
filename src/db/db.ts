import { Pool, PoolClient } from 'pg';

interface dbConnection {
    pool: Pool,
    getConnection: () => Pool,
    connect: () => void
}

export class DatabaseConnection implements dbConnection {

    public pool: Pool;

    constructor() {
        this.pool = new Pool({
            user: "postgres",
            password: "postgres",
            host: "localhost",
            port: 5432,
            database: "task_tracker",
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
            console.log("Connected to db..")
        })
    }
}