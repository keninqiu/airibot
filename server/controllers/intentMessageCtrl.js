var database = require('../common/database.js');
var dialogflowManager = require('../common/dialogflowManager.js');

module.exports = {
  lists : function(req, res) {
    var intent_id = req.body.intent_id;
    var connection = database.getConn();
     
    connection.query('SELECT * from IntentMessage where IntentID=' + intent_id, function (error, results, fields) {
      if (error) throw error;
      var resJson = {code:200,intentMessages:results};
      res.json(resJson);
    });
     
    connection.end();    	
  },
  create: function(req, res) {

  	body = req.body;	
  	intent_id = body.intent_id;
    type = body.type;
    text = body.text;
    var connection = database.getConn();
     
    connection.query("insert into IntentMessage(IntentID,Type,Text) values(" + intent_id + "," + type + ",'" + text + "')", function (error, results, fields) {
      if (error)  {
      	  var resJson = {
      	  	code:400
      	  };
          res.json(resJson);
          return;
      }
      connection.query("SELECT * from IntentMessage where IntentID=" + intent_id + " and Type=" + type + " and Text='" + text + "'", function (error, results, fields) {
	      if (error)  {
	      	  var resJson = {
	      	  	code:401
	      	  };
	          res.json(resJson);
	          return;
	      }     

          dialogflowManager.updateIntent('testagain',[text]);         		
      	  var resJson = {
      	  	code:200,
      	  	intentMessages:results
      	  };
          res.json(resJson);
          return;
      });
      connection.end();
    });
        	
  },
  update: function(req, res) {
  },
  delete: function(req, res) {
    body = req.body;  
    id = body.id;    
    var connection = database.getConn();
     
    connection.query('DELETE from IntentMessage where id=' + id, function (error, results, fields) {
      if (error) throw error;
      var resJson = {code:200,intentMessages:results};
      res.json(resJson);
    });
     
    connection.end();       
  }
}