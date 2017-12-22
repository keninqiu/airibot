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
      connection.query("SELECT Intent.NameInDialogFlow,IntentMessage.* from IntentMessage,Intent where Intent.ID=IntentMessage.IntentID and Intent.ID=" + intent_id + " and IntentMessage.Type=" + type, function (error, results, fields) {
	      if (error)  {
	      	  var resJson = {
	      	  	code:401
	      	  };
	          res.json(resJson);
	          return;
	      }     

        if(type == 1) {
          var intentName = '';
          var textArray = [];
          for(var i=0;i<results.length;i++) {
            var item = results[i];
            intentName = item.NameInDialogFlow;
            textArray.push(item.Text);
          }
          console.log('before update Intent');
          console.log('intentName='+intentName);
          console.log(textArray);
          dialogflowManager.updateIntent(intentName,textArray);  
        }

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
    intent = req.body;  
    id = intent.id;    
    intent_id = intent.intent_id;
    type = intent.type;
    var connection = database.getConn();
    
    connection.query('DELETE from IntentMessage where ID=' + id, function (error, results, fields) {
        if (error) throw error;
        console.log('type='+type); 
        if(type == 1) {
          console.log('1');
          connection.query("SELECT Intent.NameInDialogFlow,IntentMessage.* from IntentMessage,Intent where Intent.ID=IntentMessage.IntentID and Intent.ID=" + intent_id + " and IntentMessage.Type=" + type, function (error, results, fields) {
              if (error) throw error;
              var intentName = '';
              var textArray = [];
              for(var i=0;i<results.length;i++) {
                var item = results[i];
                intentName = item.NameInDialogFlow;
                textArray.push(item.Text);
              }
              console.log('updating me');
              dialogflowManager.updateIntent(intentName,textArray);  
          });
        } 

        var resJson = {code:200,intentMessages:results};
        res.json(resJson);
        if(type == 1) {
          connection.end();
        }
    });
    

    if(type != 1) {
      connection.end(); 
    }
       
  }
}