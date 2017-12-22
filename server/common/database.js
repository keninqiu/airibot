module.exports = {
  getConn : function() {
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'mysql',
      database : 'airi_dev'
    });
     
    connection.connect();  
    return connection;
  }
}