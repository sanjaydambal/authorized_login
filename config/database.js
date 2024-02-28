import { createPool } from 'mysql';


const pool = createPool({
    port:process.env.DB_PORT,
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
});

export { createPool };