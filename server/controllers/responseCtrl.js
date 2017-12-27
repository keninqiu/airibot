var detect = require('../dialogflow/detect');



module.exports = {
  reply : function(userId, message) {
  	detect.detectTextIntent(message).then(responses => {   
        const response = responses[0];
        console.log('response=');
        console.log(response);
    });

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