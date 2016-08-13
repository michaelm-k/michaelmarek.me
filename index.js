var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 5000;
var server = http.createServer(app);

var nodemailer = require("nodemailer");
var sendgrid  = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);

app.use(bodyParser());

app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.use("/static", express.static(__dirname + '/static'));

var inDevMode = false;
if (!process.env.NODE_ENV) {
	require('./env.js');
	inDevMode=true;
}

app.get('/', function (req, res) {
    res.render("index");
});

app.get('/please_upgrade', function (req, res) {
    res.render("please_upgrade");
});

app.get('/annotation', function (req, res) {
    res.render("annotation");
});

app.get('/player', function (req, res) {
    res.render("player");
});

/* TABS */

app.get('/about', function (req, res) {
    res.render("tabs/about");
});

app.get('/projects', function (req, res) {
    res.render("tabs/projects");
});

app.get('/courses', function (req, res) {
    res.render("tabs/courses");
});

app.get('/contact', function (req, res) {
    res.render("tabs/contact");
});

app.post('/contact', function (req, res) {
	if (inDevMode) {
		var smtpConfig = {
			host: 'smtp.gmail.com',
			port: 465,
			secure: true, // use SSL
			auth: {
				user: process.env.USERNAME,
				pass: process.env.PASSWORD
			}
		};
		var smtpTransport = nodemailer.createTransport(smtpConfig);
		var payload = {
			from	: req.body.name,
			subject	: req.body.email,
			to 		: 'michael.marem@gmail.com',
			text 	: req.body.message
		}
		console.log(payload);
		smtpTransport.sendMail(payload, function(error, info){
			if (error) {
				res.json({status: 500});
				console.log(error);
			} else {
				res.json({status: 202});
				console.log("Message sent: " + info.message);
			}
		});
	} else {
		var payload = {
			to      : 'michael.marem@gmail.com',
			from    : process.env.SENDER,
			subject : req.body.name + ' <' + req.body.email + '>',
			text    : req.body.message
		}
		sendgrid.send(payload, function(err, json) {
			if (err) { 
				res.json({status: 500});
				console.error(err); 
			} else {
				res.json({status: 202});
			}
			console.log(json);
		});
	}
});

/* end TABS */

var run_server = server.listen(port, function () {
  var host = run_server.address().address;
  var port = run_server.address().port;

  console.log('Listening at http://%s:%s', host, port);
});