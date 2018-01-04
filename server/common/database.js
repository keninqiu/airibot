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
    /*
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
    */
    const  mysql = require('mysql2/promise');
  // create the connection
    var connection = await mysql.createConnection({
      host     : config.DB_HOST,
      user     : config.DB_USER,
      password : config.DB_PASS,
      database : config.DB_NAME
    });  // query database
    const [rows, fields] = await connection.execute(sql, []);
    if(rows.length > 0)
      return rows[0];
    return [];
  }  
}