const express = require('express');
const router = express.Router();



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

module.exports = router;