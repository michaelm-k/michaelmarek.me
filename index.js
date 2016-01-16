var express = require('express');
var http = require('http');
var app = express();
var port = process.env.PORT || 5000;
var server = http.createServer(app);

var sendgrid  = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);

app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.use("/static", express.static(__dirname + '/static'));

app.get('/', function (req, res) {
    res.render("index");
});

app.get('/please_upgrade', function (req, res) {
    res.render("please_upgrade");
});

app.get('/about', function (req, res) {
    res.render("about");
});

app.get('/projects', function (req, res) {
    res.render("projects");
});

app.get('/contact', function (req, res) {
    res.render("contact");
});

app.post('/contact', function (req, res) {
	var payload   = {
		to      : process.env.RECIPIENT,
		from    : process.env.SENDER,
		subject : 'Saying Hi',
		text    : 'This is my first email through SendGrid'
	}
	sendgrid.send(payload, function(err, json) {
		if (err) { console.error(err); }
		console.log(json);
	});
});

app.get('/annotation', function (req, res) {
    res.render("annotation");
});

app.get('/player', function (req, res) {
    res.render("player");
});

var run_server = server.listen(port, function () {
  var host = run_server.address().address;
  var port = run_server.address().port;

  console.log('Listening at http://%s:%s', host, port);
});

// ping app every 45 min
setInterval(function() {
    http.get("https://michaelm-k.herokuapp.com");
}, 2700000);