var database = require('../common/database.js');
var dialogflowManager = require('../common/dialogflowManager.js');

module.exports = {
  lists : function(req, res) {
    var connection = database.getConn(); 
    var sql = 'SELECT Intent.*,IntentMessage.ID as IntentMessageID,IntentMessage.Type,IntentMessage.Text from Intent left join IntentMessage on IntentMessage.IntentID=Intent.ID';
    connection.query(sql, function (error, results, fields) {
      if (error) throw error;
      var intents = [];
      for (i = 0; i < results.length; i++) { 
        item = results[i];
        existedInArray = false;
        for (j = 0; j < intents.length; j++) {
          intent = intents[j];
          if(intent.ID == item.ID) {
            existedInArray = true;
            if(item.Type == 1) {
              intent.UserSays.push({id:item.IntentMessageID,text:item.Text});
            }
            else if(item.Type == 2){
              intent.Response.push({id:item.IntentMessageID,text:item.Text});
            }
          }
        }
        if(!existedInArray) {
          intent = {ID:item.ID,Name:item.Name,UserSays:[],Response:[]};
          if(item.Type == 1) {
            intent.UserSays.push({id:item.IntentMessageID,text:item.Text});
          }
          else if(item.Type == 2){
            intent.Response.push({id:item.IntentMessageID,text:item.Text});
          }  
          intents.push(intent);        
        }
      }
      var resJson = {code:200,intents:intents};
      res.json(resJson);
    });
     
    connection.end();    	
  },
  create: function(req, res) {

  	body = req.body;	
  	name = body.name;
    var connection = database.getConn(); 
     
    connection.query("insert into Intent(Name) values('" + name + "')", function (error, results, fields) {
      if (error)  {
      	  var resJson = {
      	  	code:400
      	  };
          res.json(resJson);
          return;
      }
      connection.query("SELECT * from Intent where Name='" + name + "'", function (error, results, fields) {
	      if (error)  {
	      	  var resJson = {
	      	  	code:401
	      	  };
	          res.json(resJson);
	          return;
	      }  

        dialogflowManager.createIntent(name);
        /*
        var sessionClientRequestBundle = dialogflowManager.getSessionClientRequest('Hi');
        var sessionClient = sessionClientRequestBundle.sessionClient;
        var request = sessionClientRequestBundle.request;
        // Send request and log result
        sessionClient
          .detectIntent(request)
          .then(responses => {
            console.log('Detected intent');
            const result = responses[0].queryResult;
            console.log(`  Query: ${result.queryText}`);
            console.log(`  Response: ${result.fulfillmentText}`);
            if (result.intent) {
              console.log(`  Intent: ${result.intent.displayName}`);
            } else {
              console.log(`  No intent matched.`);
            }
          })
          .catch(err => {
            console.error('ERROR:', err);
          });   
          */


      	  var resJson = {
      	  	code:200,
      	  	intents:results
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
    console.log('id='+id);
    var connection = database.getConn(); 
     
    connection.query('DELETE from Intent where ID=' + id, function (error, results, fields) {
      if (error) throw error;
      connection.query('DELETE from IntentMessage where IntentID=' + id, function (error, results, fields) {
        var resJson = {code:200,intents:results};
        res.json(resJson);
      });
      connection.end(); 
    });
     
          
  }
}