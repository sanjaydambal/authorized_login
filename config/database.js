// Load environment variables if not already loaded
import dotenv from 'dotenv';
dotenv.config();

import { createPool } from 'mysql';

const pool = createPool({
    port: parseInt(process.env.DB_PORT),
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
});

export { pool };
