// Dependencies
var express = require('express'),
	OpenTok = require('opentok'),
	config = require('./config/env/' + express().get('env'));


// Verify that the API Key and API Secret are defined
var apiKey = config.tokbox.API_KEY,
	apiSecret = config.tokbox.API_SECRET;
if (!apiKey || !apiSecret) {
	console.log('You must specify API_KEY and API_SECRET environment variables');
	process.exit(1);
}

// Initialize the express app
var app = express();
app.use(express.static(__dirname + '/public'));
init();


// Initialize OpenTok
var opentok = new OpenTok(apiKey, apiSecret);

// // Create a session and store it in the express app
// opentok.createSession(function(err, session) {
//   if (err) throw err;
//   app.set('sessionId', session.sessionId);
//   // We will wait on starting the app until this is done
//   init();
// });


app.get('/', function(req, res) {
	res.render('home.ejs')
});

app.get('/generateSession', function (req, res) {
	opentok.createSession(function(err, session) {
		if (err) throw err;
		return res.send({session: session.sessionId})
	});
});

app.get('/session/:id/:role', function (req, res) { //pass in user type or use middleware for verification and pass that to front end to display buttons
	var role = req.params.role; // simulate roles eventually replaced with middleware or something else for authorization
	var tokenOptions = {};
	// tokenOptions.role = "publisher";
	// tokenOptions.data = "username=bob";
	tokenOptions.expireTime = 1521760060; //TODO: Thursday, March 22, 2018 11:07:40 PM UNIX TIME SECONDS

	var sessionId = req.params.id,
		// generate a fresh token for this client
		token = opentok.generateToken(sessionId, tokenOptions);

	res.render('index.ejs', {
		apiKey: apiKey,
		sessionId: sessionId,
		token: token,
		role: role
	});
});


// Start the express app
function init() {
	//TODO: Currently set for https://dev2.notarycam.com which is on port 4007.
	var port = process.env.PORT || 3000;
	app.listen(port, function() {
		console.log('You\'re app is now ready at port:' + port);
	});
}
