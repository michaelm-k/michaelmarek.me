var express = require('express');
var Busboy = require('busboy');
var Mincer = require('mincer');
var csso = require('csso');
var uglify = require('uglify-js');
var http = require('http');
var fs = require('fs');

var app = express();
var port = process.env.PORT || 5000;
var server = http.createServer(app);
var environment = process.env.NODE_ENV || 'development';

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);

var mincerEnvironment = new Mincer.Environment();
mincerEnvironment.appendPath('assets');
mincerEnvironment.appendPath('vendor');
app.use('/assets', Mincer.createServer(mincerEnvironment));

if (environment !== 'development') {
  mincerEnvironment.jsCompressor = function(context, data) {
    return uglify.minify(data, {fromString: true}).code;
  };
  mincerEnvironment.cssCompressor = function(context, data) {
    return csso.minify(data).css;
  };
}

if (environment === 'development') {
  require('./env.js');
}

app.get('/', function(req, res) {
  res.header('Vary', 'Accept-Encoding').render("index");
});

app.get('/please_upgrade', function(req, res) {
  res.header('Vary', 'Accept-Encoding').render("other/please_upgrade");
});

app.get('/annotation', function(req, res) {
  res.render("other/annotation");
});

app.get('/player', function(req, res) {
  res.render("other/player");
});

app.get('/about', function(req, res) {
  res.header('Vary', 'Accept-Encoding').render("tabs/about");
});

app.get('/projects', function(req, res) {
  res.header('Vary', 'Accept-Encoding').render("tabs/projects");
});

app.get('/courses', function(req, res) {
  res.header('Vary', 'Accept-Encoding').render("tabs/courses"); 
});

var acceptedMimetypes = {'application/pdf': true, 
                         'text/plain': true, 
                         'image/png': true, 
                         'image/jpeg': true, 
                         'image/gif': true};

app.route('/uploads')
  .get(function(req, res) {
    fs.readdir('assets/uploads', function(err, files) {
      if (req.get('want') === process.env.UPLOAD_CODE) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(files));
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('What do you *want*?');
      }  
    }); 
  })
  .post(function(req, res) {
    var busboy = new Busboy({ headers: req.headers });
    var files = [];

    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      var currentChunks = [];
      var validFile = fieldname === process.env.UPLOAD_CODE && acceptedMimetypes[mimetype];
      file.on('data', function(data) {
        if (validFile) {
          currentChunks.push(data);
        }      
      });
      file.on('end', function() {
        if (validFile) {
          files.push({ name: filename, data: Buffer.concat(currentChunks) });
        }
      });
    });
    busboy.on('finish', function() {
      res.writeHead(files.length === 0 ? 418 : 201, { 'Content-Type': 'text/plain', 'Connection': 'close' });
      res.end(files.length === 0 ? "Who do you think you are?" : "Mk, I'll look the other way this time.");
      for (var i=0; i<files.length; i++) {
        fs.writeFile('assets/uploads/' + files[i].name, files[i].data, function(err) {});
      }  
    });
    req.pipe(busboy);
  })
  .delete(function(req, res) {
    var busboy = new Busboy({ headers: req.headers });
    var filenames = [];

    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
      if (fieldname === process.env.UPLOAD_CODE) {
        filenames.push(val);
      }
    });
    busboy.on('finish', function() {
      res.writeHead(filenames.length === 0 ? 418 : 200, { 'Content-Type': 'text/plain', 'Connection': 'close' });
      res.end(filenames.length === 0 ? "Who do you think you are?" : "Mk, I'll look the other way this time.");
      for (var i=0; i<filenames.length; i++) {
        fs.unlink('assets/uploads/' + filenames[i], function(err) {});
      }
    });
    req.pipe(busboy);
  });

server.listen(port, function () {
  console.log('Listening at http://%s:%s', this.address().address, this.address().port);
});