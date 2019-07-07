const Pool = require('pg').Pool

function ConnectionFactory(){
    const pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'pagamentos',
        password: 'postgres',
        port: 5432,
    });

    return pool;
}


module.exports = function () {
    return ConnectionFactory;
}