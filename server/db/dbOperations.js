const sqlConfig = require('./dbconfig');
const sql = require('mssql');
let pool = null;

async function connectDb() {
    pool = await sql.connect(sqlConfig);
}

async function execQuery(queryToExecute) {
    if (pool == null)
        await connectDb();
    let result = await pool.request().query(queryToExecute);
    return result.recordset;
}


module.exports.execQuery = execQuery;


