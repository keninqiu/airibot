const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
var FBBotFramework = require('fb-bot-framework');

/*
// API file for interacting with MongoDB
const api = require('./server/routes/api');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// API location
app.use('/api', api);
*/
// Initialize 
var bot = new FBBotFramework({
    page_token: "EAAOEyBY1Y04BALhBM3RIPlYdDB5tgyFHCHPPpAnswXSrOZBGF45BecWW0RtNA4oChZCWLV82nrJ8Hg3NaZAF16DB6UyQZAifMTGZBZCFj9kzm9RhXMSZC4KxXh1DyiAjqPp6b6NZC0FfYrDbsGvfPrZBIZAlgcGp5X4vBdGgo4pw2ZAMgZDZD",
    verify_token: "98523020"
});
 
// Setup Express middleware for /webhook 
app.use('/webhooks/facebook', bot.middleware());

// Setup listener for incoming messages 
bot.on('message', function(userId, message){
    //bot.sendTextMessage(userId, "Echo Message:" + message); 
   
    // Send quick replies 
    var messageText = 'Your userId is ' + userId + ',You say:' + message ;
    var replies = [
        {
            "content_type": "text",
            "title": "Good to go",
            "payload": "thumbs_up"
        },
        {
            "content_type": "text",
            "title": "Bad to delete",
            "payload": "thumbs_down"
        }
    ];
    bot.sendQuickReplies(userId, messageText, replies);
    
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

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));