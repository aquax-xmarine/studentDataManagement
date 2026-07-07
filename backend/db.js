const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "student-db",
    database: "studentdb",
    password: "password123",
    port: 5432
});

module.exports = pool;