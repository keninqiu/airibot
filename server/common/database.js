var config = require('./config.json');
module.exports = {
  getConn : function() {
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
      host     : config.DB_HOST,
      user     : config.DB_USER,
      password : config.DB_PASS,
      database : config.DB_NAME
    });
     
    connection.connect();  
    return connection;
  },
  execSql:async function(sql) {
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
      host     : config.DB_HOST,
      user     : config.DB_USER,
      password : config.DB_PASS,
      database : config.DB_NAME
    });
     
    connection.connect();  
    var result = await connection.query(sql, true);
    connection.end();
    return result;        
  }  
}