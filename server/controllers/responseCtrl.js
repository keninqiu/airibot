//var detect = require('../dialogflow/detect');

const projectId = 'airi-b9eae'; //https://dialogflow.com/docs/agents#settings
const sessionId = 'quickstart-session-id';
const languageCode = 'en-US';

module.exports = {
  reply : function(userId, message) {
  	var queries = [message];

  	//detect.detectTextIntent(projectId,sessionId,queries, languageCode)；

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
    return {messageText:messageText,quickReplies:quickReplies};  	
  }
}