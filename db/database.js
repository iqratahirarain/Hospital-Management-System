const Pool = require("pg").Pool;

const pool = new Pool({
    user:"postgres",
    password: "abdullahfaimina",
    database: "hospital",
    host: "localhost",
    port: "5432"
})

module.exports = pool;