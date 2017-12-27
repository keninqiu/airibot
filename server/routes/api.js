const express = require('express');
const router = express.Router();
var intentCtrl = require('../controllers/intentCtrl.js');
var intentMessageCtrl = require('../controllers/intentMessageCtrl.js');
var bodyParser = require('body-parser');

var detect = require('../dialogflow/detect');


var jsonParser = bodyParser.json();
var urlEncodedParser = bodyParser.urlencoded({ extended: false });
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
    var message = 'hi';
    detect.detectTextIntent(message).then(responses => {   
        const response = responses[0];
        var intentName = response.queryResult.intent.displayName;
        console.log('intentName=');
        console.log(intentName);
    });

    var FBMessenger = require('fb-messenger');
    var messenger = new FBMessenger('EAAOEyBY1Y04BALhBM3RIPlYdDB5tgyFHCHPPpAnswXSrOZBGF45BecWW0RtNA4oChZCWLV82nrJ8Hg3NaZAF16DB6UyQZAifMTGZBZCFj9kzm9RhXMSZC4KxXh1DyiAjqPp6b6NZC0FfYrDbsGvfPrZBIZAlgcGp5X4vBdGgo4pw2ZAMgZDZD');
     
    messenger.sendTextMessage('1103988123037720', 'Hello World');

    var users = [{id:1,name:'keningqiuddde'}];
    response.data = users;
    res.json(response);
});

router.get('/intents',jsonParser, intentCtrl.lists);  
router.post('/intent/create',jsonParser, intentCtrl.create);  
router.post('/intent/delete',jsonParser, intentCtrl.delete); 
router.get('/intentMessages',urlEncodedParser, intentMessageCtrl.lists);  
router.post('/intentMessage/create',jsonParser, intentMessageCtrl.create);  
router.post('/intentMessage/delete',jsonParser, intentMessageCtrl.delete); 
module.exports = router;