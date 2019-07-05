const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'pagamentos',
    password: 'postgres',
    port: 5432,
});

module.exports = function () {
    return pool;
}