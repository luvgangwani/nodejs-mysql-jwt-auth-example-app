const { createPool } = require("mysql2");

const pool = createPool({
    port: Number(process.env.MYSQL_PORT),
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_ROOT_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectionLimit: Number(process.env.MYSQL_POOL_CONNECTION_LIMIT)
});

module.exports = pool;
