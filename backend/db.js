const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "student-db",
    database: "studentdb",
    password: "24119",
    port: 5432
});

module.exports = pool;