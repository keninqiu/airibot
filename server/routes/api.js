const express = require('express');
const router = express.Router();
var intentCtrl = require('../controllers/intentCtrl.js');
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

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
    var FBMessenger = require('fb-messenger');
    var messenger = new FBMessenger('EAAOEyBY1Y04BALhBM3RIPlYdDB5tgyFHCHPPpAnswXSrOZBGF45BecWW0RtNA4oChZCWLV82nrJ8Hg3NaZAF16DB6UyQZAifMTGZBZCFj9kzm9RhXMSZC4KxXh1DyiAjqPp6b6NZC0FfYrDbsGvfPrZBIZAlgcGp5X4vBdGgo4pw2ZAMgZDZD');
     
    messenger.sendTextMessage('1103988123037720', 'Hello World');

    var users = [{id:1,name:'keningqiu'}];
    response.data = users;
    res.json(response);
});

router.get('/intents',jsonParser, intentCtrl.lists);  
router.post('/intent/create',jsonParser, intentCtrl.create);  
module.exports = router;