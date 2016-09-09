var express = require('express');
var http = require('http');
var httpProxy = require('http-proxy');

var app = express();
var proxy = httpProxy.createProxyServer();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    response.render('index');
});

app.get('/site/:b64url', function(req, res) {
    var website = new Buffer(req.params.b64url, 'base64').toString('ascii');
    req.url = website;
    proxy.web(req, res);
});

/*
http.createServer(function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.write('request successfully proxied to: ' + req.url + '\n' + JSON.stringify(req.headers, true, 2));
    res.end();
}).listen(8080);
*/

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
