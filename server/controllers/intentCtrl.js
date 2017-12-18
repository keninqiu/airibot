module.exports = {
  lists : function(req, res) {
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'mysql',
      database : 'airi_dev'
    });
     
    connection.connect();
     
    connection.query('SELECT * from Intent', function (error, results, fields) {
      if (error) throw error;
      var resJson = {intents:results};
      res.json(resJson);
    });
     
    connection.end();    	
  },
  create: function(req, res) {

  	body = req.body;	
  	name = body.name;
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'mysql',
      database : 'airi_dev'
    });
     
    connection.connect();
     
    connection.query("insert into Intent(Name) values('" + name + "')", function (error, results, fields) {
      if (error) throw error;
      var resJson = {results:results};
      res.json(resJson);
    });
     
    connection.end();    	
  },
  update: function(req, res) {
  },
  delete: function(req, res) {
  }
}