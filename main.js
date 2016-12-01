var express = require('express');
var Mincer  = require('mincer');
var csso = require('csso');
var uglify = require('uglify-js');
var http = require('http');
var app = express();
var port = process.env.PORT || 5000;
var server = http.createServer(app);
var mincerEnvironment = new Mincer.Environment();
var environment = process.env.NODE_ENV || 'development';

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);

mincerEnvironment.appendPath('assets');
mincerEnvironment.appendPath('vendor');
if (environment !== 'development') {
  mincerEnvironment.jsCompressor = function(context, data) {
    return uglify.minify(data, {fromString: true}).code;
  };
  mincerEnvironment.cssCompressor = function(context, data) {
    return csso.minify(data).css;
  };
}
app.use('/assets', Mincer.createServer(mincerEnvironment));

if (environment === 'development') {
	require('./env.js');
}

app.get('/', function (req, res) {
  res.header('Vary', 'Accept-Encoding').render("index");
});

app.get('/please_upgrade', function (req, res) {
  res.header('Vary', 'Accept-Encoding').render("other/please_upgrade");
});

app.get('/annotation', function (req, res) {
  res.render("other/annotation");
});

app.get('/player', function (req, res) {
  res.render("other/player");
});

app.get('/about', function (req, res) {
  res.header('Vary', 'Accept-Encoding').render("tabs/about");
});

app.get('/projects', function (req, res) {
  res.header('Vary', 'Accept-Encoding').render("tabs/projects");
});

app.get('/courses', function (req, res) {
	res.header('Vary', 'Accept-Encoding').render("tabs/courses");	
});

var run_server = server.listen(port, function () {
  var host = run_server.address().address;
  var port = run_server.address().port;

  console.log('Listening at http://%s:%s', host, port);
});