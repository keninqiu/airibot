var detect = require('../dialogflow/detect');
var database = require('../common/database.js');

module.exports = {
  reply : async function(userId, message) {
  	responses = await detect.detectTextIntent(message);
    const response = responses[0];
    var intentName = response.queryResult.intent.displayName;

  	var parameters = JSON.stringify(response.queryResult.parameters);
  	parameters = parameters.replace('\'', '\\\'');

  	//var sql = "SELECT distinct IntentMessage.* from Intent,IntentMessage where IntentMessage.Type = 2 and IntentMessage.IntentID=Intent.ID and Intent.Name='" + intentName + "'";

  	var sql = "call IntentProcess(1,'" + userId + "','" + message + "','" + intentName + "','" + parameters + "')";
	console.log('sql='+sql);
	var result = await database.execSql(sql);

	console.log(result);
	var text = 'Unknown Intent 0';
	console.log('length=' + result.length);
	if (result.length > 0) {
		result = result[0];
		if (result.length > 0) {
			console.log('result0=');
			console.log(result[0]);
			text = result[0].Text;
			console.log('text='+text);	
		}
	}

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
	var ret =  {messageText:text,quickReplies:quickReplies};  	
	return ret;
  	/*
  await	detect.detectTextIntent(message).then(responses => {   
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
    */
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