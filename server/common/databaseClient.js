var Client = require("mysql-pro");
var config = require('./config.json');
module.exports = {
  getClient : function() {
    var client = new Client({
        mysql: {
            host: config.DB_HOST,
            port: 3306,
            database: config.DB_NAME,
            user: config.DB_USER,
            password: config.DB_PASS
        }
    });
    return client;
  },
  execSql:async function(sql) {
    var client = new Client({
        mysql: {
            host: config.DB_HOST,
            port: 3306,
            database: config.DB_NAME,
            user: config.DB_USER,
            password: config.DB_PASS
        }
    });
    await client.startTransaction();
    var result = await client.executeTransaction(sql, []);
    await client.stopTransaction();
    return result;        
  }
}