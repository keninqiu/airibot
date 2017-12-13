const express = require('express');
const router = express.Router();
var FBBotFramework = require('fb-bot-framework');

// Initialize 
var bot = new FBBotFramework({
    page_token: "EAAOEyBY1Y04BALhBM3RIPlYdDB5tgyFHCHPPpAnswXSrOZBGF45BecWW0RtNA4oChZCWLV82nrJ8Hg3NaZAF16DB6UyQZAifMTGZBZCFj9kzm9RhXMSZC4KxXh1DyiAjqPp6b6NZC0FfYrDbsGvfPrZBIZAlgcGp5X4vBdGgo4pw2ZAMgZDZD",
    verify_token: "98523020"
});
 
// Setup Express middleware for /webhook 
app.use('/webhooks/facebook', bot.middleware());

// Setup listener for incoming messages 
bot.on('message', function(userId, message){
    // bot.sendTextMessage(userId, "Echo Message:" + message); 
    
    // Send quick replies 
    var replies = [
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
    bot.sendQuickReplies(userId, message, replies);
});
 
// Setup listener for quick reply messages 
bot.on('quickreply', function(userId, payload){
    bot.sendTextMessage(userId, "payload:" + payload);
});
 
// Config the Get Started Button and register a callback 
bot.setGetStartedButton("GET_STARTED");
bot.on('postback', function(userId, payload){
 
    if (payload == "GET_STARTED") {
        getStarted(userId);
    }
    
    // Other postback callbacks here 
    // ... 
    
});
 
function getStarted(userId){
    
    // Get started process  
}
 
// Setup listener for attachment 
bot.on('attachment', function(userId, attachment){
    
    // Echo the audio attachment 
    if (attachment[0].type == "audio") {
        bot.sendAudioAttachment(userId, attachment[0].payload.url);
    }
    
});

/*
// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/users', (req, res) => {
    var users = [{id:1,name:'keningqiu'}];
    response.data = users;
    res.json(response);
});

router.get('/webhooks/facebook', (req, res) => {
	if(req.query['hub.verify_token'] == '98523020') {
		res.send(req.query['hub.challenge']);
	}
    else {
    	res.send('');
    }
});

router.post('/webhooks/facebook', (req, res) => {
    var users = [{id:1,name:'keningqiu'}];
    response.data = users;
    res.json(response);
});
*/
module.exports = router;