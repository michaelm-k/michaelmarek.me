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
	inDevMode=true;
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

var terms = [{"term": "1A Fall 2014",
			  "courses":[
				"CS 137 Programming Principles",
				"ECE 105 Physics of Electrical Engineering 1",
				"ECE 140 Linear Circuits",
				"MATH 115 Linear Algebra for Engineering",
				"MATH 117 Calculus 1 for Engineering",
				"SE 101 Introduction to Methods of Software Engineering"]},
			{"term": "1B Winter 2015",
			 "courses":[
				"CS 138 Introduction to Data Abstraction and Implementation",
				"ECE 106 Physics of Electrical Engineering 2",
				"ECE 124 Digital Circuits and Systems",
				"MATH 119 Calculus 2 for Engineering",
				"MATH 135 Algebra for Honours Mathematics"]},
			{"term": "2A Fall 2015",
			 "courses":[
				"CHE 102 Chemistry for Engineers",
				"CS 241E Foundations of Sequential Programs (Enriched)",
				"ECE 222 Digital Computers",
				"SE 212 Logic and Computation",
				"STAT 206 Statistics for Software Engineering",
				"ECON 101 Introduction to Microeconomics"]},
			{"term": "2B Spring 2016",
			 "courses":[
				"CS 240 Data Structures and Data Management",
				"CS 247 Software Engineering Principles",
				"MSCI 261 Engineering Economics: Financial Management for Engineers",
				"MATH 213 Advanced Mathematics for Software Engineers",
				"MATH 239 Introduction to Combinatorics",
				"SPCOM 223 Public Speaking"]},
			{"term": "3A Winter 2017",
			 "courses":[
				"CS 341 Algorithms", 
				"CS 349 User Interfaces",
				"SE 350 Operating Systems",
				"SE 465 Software Testing and Quality Assurance",
				"TBD"]}];

app.get('/about', function (req, res) {
    res.render("tabs/about");
});

app.get('/projects', function (req, res) {
    res.render("tabs/projects");
});

app.get('/courses', function (req, res) {
    var _terms = terms.slice(0).reverse();
	for (var i=0; i<_terms.length; i++) {
		_terms[i]["links"] = [];
		for (var j=0; j<_terms[i].courses.length; j++) {
			var arr = _terms[i].courses[j].split(' ');
			var program = arr[0];
			if (program !== "TBD") {
				var code = arr[1].substr(0,3);
				_terms[i]["links"].push("http://www.ucalendar.uwaterloo.ca/1213/COURSE/course-"+program+".html#"+program+code);
			}		
		}
	}
	res.render("tabs/courses", {"terms": _terms});	
});

/* end TABS */

var run_server = server.listen(port, function () {
  var host = run_server.address().address;
  var port = run_server.address().port;

  console.log('Listening at http://%s:%s', host, port);
});