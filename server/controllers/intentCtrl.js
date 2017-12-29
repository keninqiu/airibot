var database = require('../common/database.js');
var dialogflowManager = require('../common/dialogflowManager.js');

module.exports = {
  listEntities: function(req, res) {
    var intent_id = req.body.intent_id;
    var connection = database.getConn();
    var sql = 'SELECT * from IntentEntity where IntentID=' + intent_id;
    console.log('sql in listEntities='+sql); 
    connection.query(sql, function (error, results, fields) {
      if (error) throw error;
      var resJson = {code:200,intentEntities:results};
      res.json(resJson);
    });
     
    connection.end();       
  },
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
              intent.UserSays.push({ID:item.IntentMessageID,IntentID:item.IntentID,Type:item.Type,Text:item.Text});
            }
            else if(item.Type == 2){
              intent.Response.push({ID:item.IntentMessageID,IntentID:item.IntentID,Type:item.Type,Text:item.Text});
            }
          }
        }
        if(!existedInArray) {
          intent = {ID:item.ID,Name:item.Name,UserSays:[],Response:[]};
          if(item.Type == 1) {
            intent.UserSays.push({ID:item.IntentMessageID,IntentID:item.IntentID,Type:item.Type,Text:item.Text});
          }
          else if(item.Type == 2){
            intent.Response.push({ID:item.IntentMessageID,IntentID:item.IntentID,Type:item.Type,Text:item.Text});
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

    dialogflowManager.createIntent(name).then(responses => {
        console.log('responsehaha from createIntent');
        console.log(responses);
        var intent = responses[0];
        var NameInDialogFlow = intent.name;
        console.log(NameInDialogFlow);
        console.log('end');
        name = name.replace('\'', '\\\'');
        connection.query("insert into Intent(Name,NameInDialogFlow) values('" + name + "','" + NameInDialogFlow + "')", function (error, results, fields) {
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

              var resJson = {
                code:200,
                intents:results
              };
              res.json(resJson);
              return;
          });
          connection.end();
        });    
        

    })
    .catch(err => {
        console.error('ERROR:', err);
    }); 


        	
  },
  update: function(req, res) {
  },
  delete: function(req, res) {
    body = req.body;  
    id = body.id;    
    console.log('id='+id);
    var connection = database.getConn(); 
    
    connection.query('select * from Intent where ID=' + id, function (error, results, fields) {
      var intent = results[0];
      dialogflowManager.deleteIntent(intent.NameInDialogFlow);
    }); 
    connection.query('DELETE from Intent where ID=' + id, function (error, results, fields) {
      if (error) throw error;
      connection.query('DELETE from IntentMessage where IntentID=' + id, function (error, results, fields) {
        
        var resJson = {code:200,intents:results};
        res.json(resJson);
      });
      connection.end(); 
    });
     
          
  },

  saveEntity: function(req, res) {
    body = req.body;  
    intent_id = body.intent_id;  
    name = body.name;
    value = body.value;
    name = name.replace('\'', '\\\'');
    value = value.replace('\'', '\\\'');
    var connection = database.getConn(); 
    var sql = "insert into IntentEntity(IntentID,Name,Value) values(" + intent_id + ",'" + name + "','" + value + "')";
    connection.query(sql, function (error, results, fields) {
          if (error)  {
              var resJson = {
                code:400,
                sql:sql
              };
              res.json(resJson);
              return;
          }
          sql = "SELECT * from IntentEntity where IntentID=" + intent_id + " and Name='" + name + "' and Value='" + value + "'";
          connection.query(sql, function (error, results, fields) {
            if (error)  {
                var resJson = {
                  code:401,
                  sql:sql
                };
                res.json(resJson);
                return;
            }  

              var resJson = {
                code:200,
                intentEntities:results
              };
              res.json(resJson);
              return;
          });
          connection.end();
        });          
  },
  deleteEntity:function(req, res) {
    body = req.body;  
    id = body.id; 
    var connection = database.getConn(); 
    connection.query('DELETE from IntentEntity where ID=' + id, function (error, results, fields) {
        var resJson = {code:200,intentEntities:results};
        res.json(resJson);
      });
      connection.end();      
  }
}