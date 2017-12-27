var detect = require('../dialogflow/detect');
var database = require('../common/database.js');


module.exports = {
  reply : function(userId, message) {
  	detect.detectTextIntent(message).then(responses => {   
        const response = responses[0];
        var intentName = response.queryResult.intent.displayName;
        console.log('intentName=');
        console.log(intentName);

	    var connection = database.getConn();
	     
	    connection.query("SELECT distinct IntentMessage.* from Intent,IntentMessage where IntentMessage.Type = 2 and IntentMessage.IntentID=Intent.ID and Intent.Name='" + intentName + "'", function (error, results, fields) {
	      if (error) throw error;
	      var length = results.length;
	      if(length > 0) {
	      	var randomIndex = Math.floor((Math.random() * length));
	      	var text = results[randomIndex].Text;
		    var quickReplies = [
		        {
		            "content_type": "text",
		            "title": "Good",
		            "payload": "thumbs_up"
		        },
		        {
		            "content_type": "text",
		            "title": "Bad",
		            "payload": "thumbs_down"
		        }
		    ];	      	
	      	return {messageText:text,quickReplies:quickReplies};  
	      }

	    });
	     
	    connection.end();  

    });
  	/*
    var messageText = 'Your userId is ' + userId + ',You say:' + message ;
    var quickReplies = [
        {
            "content_type": "text",
            "title": "Good",
            "payload": "thumbs_up"
        },
        {
            "content_type": "text",
            "title": "Bad",
            "payload": "thumbs_down"
        }
    ];
    
    */	
  }
}