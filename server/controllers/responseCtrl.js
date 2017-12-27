module.exports = {
  reply : function(userId, message) {
    var messageText = 'Your userId is ' + userId + ',You say:' + message ;
    var quickReplies = [
        {
            "content_type": "text",
            "title": "Good answer",
            "payload": "thumbs_up"
        },
        {
            "content_type": "text",
            "title": "Bad answer",
            "payload": "thumbs_down"
        }
    ];
    return {messageText:messageText,quickReplies:quickReplies};  	
  }
}