var detect = require('../dialogflow/detect');
var databaseClient = require('../common/databaseClient.js');


module.exports = {
  reply : async function(userId, message) {
  	responses = await detect.detectTextIntent(message);
    const response = responses[0];
    var intentName = response.queryResult.intent.displayName;
    console.log('response from detectTextIntent=');
    console.log(response);
  	console.log('parameters=');
  	console.log(response.queryResult.parameters);

  	var sql = "SELECT distinct IntentMessage.* from Intent,IntentMessage where IntentMessage.Type = 2 and IntentMessage.IntentID=Intent.ID and Intent.Name='" + intentName + "'";
	var client = databaseClient.getClient();
	await client.startTransaction();
	var result = await client.executeTransaction(sql, []);
	await client.stopTransaction();

	//console.log('result=');
	//console.log(result);
	var text = 'unknown';
	if (result.length > 0) {
		text = result[0].Text;
		IntentID = result[0].IntentID;
		sql = "insert into UserDialog(SocialID,SocialUserID,message,IntentID) values(1,'" + userId + "','" + message + "'," + IntentID + ")";
		var client = databaseClient.getClient();
		client.startTransaction();
		client.executeTransaction(sql, []);
		client.stopTransaction();		
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
	console.log('ret3=');
	console.log(ret);    	
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