const sqlConfig = {
    user: "admin",
    password: "autolight",
    database: "autoLightDb",
    server: 'autolight-db.cvpwxpqfprzu.us-east-1.rds.amazonaws.com',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000 //todo: 30000 or other number ?
    },
    options: {
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}

module.exports = sqlConfig;
