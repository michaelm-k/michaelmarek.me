var express = require('express');
var http = require('http');
var app = express();
var port = process.env.PORT || 5000;
var server = http.createServer(app);

app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.use("/static", express.static(__dirname + '/static'));

var inDevMode = false;
if (!process.env.NODE_ENV) {
	require('./env.js');
	inDevMode = true;
}

app.get('/', function (req, res) {
    res.render("index");
});

app.get('/please_upgrade', function (req, res) {
    res.render("other/please_upgrade");
});

app.get('/annotation', function (req, res) {
    res.render("other/annotation");
});

app.get('/player', function (req, res) {
    res.render("other/player");
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

/* end TABS */

var run_server = server.listen(port, function () {
  var host = run_server.address().address;
  var port = run_server.address().port;

  console.log('Listening at http://%s:%s', host, port);
});