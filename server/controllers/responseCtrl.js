var detect = require('../dialogflow/detect');



module.exports = {
  reply : function(userId, message) {
  	detect.detectTextIntent(message);

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