const Pool = require("pg").Pool;

const pool = new Pool({
    user:"postgres",
    password: "Seven89",
    database: "hospital",
    host: "localhost",
    port: "5432"
});

module.exports = pool;