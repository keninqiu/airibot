const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
var FBBotFramework = require('fb-bot-framework');
var responseCtrl = require('./server/controllers/responseCtrl.js');

app.use(express.static(path.join(__dirname, 'dist')));

const api = require('./server/routes/api');
app.use('/api', api);

var bot = new FBBotFramework({
    page_token: "EAAOEyBY1Y04BALhBM3RIPlYdDB5tgyFHCHPPpAnswXSrOZBGF45BecWW0RtNA4oChZCWLV82nrJ8Hg3NaZAF16DB6UyQZAifMTGZBZCFj9kzm9RhXMSZC4KxXh1DyiAjqPp6b6NZC0FfYrDbsGvfPrZBIZAlgcGp5X4vBdGgo4pw2ZAMgZDZD",
    verify_token: "98523020"
});
 
// Setup Express middleware for /webhook 
app.use('/webhooks/facebook', bot.middleware());

// Setup listener for incoming messages 
bot.on('message', async function(userId, message){
    var reply = await responseCtrl.reply(userId, message);
    bot.sendQuickReplies(userId, reply.messageText, reply.quickReplies);   
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