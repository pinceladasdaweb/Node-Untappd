"use strict";

var express  = require('express'),
    request  = require('request'),
    compress = require('compression'),
    route    = express.Router(),
    app      = express(),
    port     = process.env.PORT || 9001,
    pub      = __dirname;

app.use(compress({
    filter: function(req, res) {
        return (/json|text|javascript|css|image\/svg\+xml|application\/x-font-ttf/).test(res.getHeader('Content-Type'));
    },
    level: 9
}));

app.use(express.static(pub + '/public', {maxAge: 86400000}));

route.get('/', function (req, res) {
    res.sendfile("views/index.html");
});

route.get('/checkins', function (req, res) {
    request({
        url: 'http://api.untappd.com/v4/user/checkins/' + req.query.user,
        json: true,
        timeout: 10000,
        qs: {
            client_id: '', // Your Client ID here
            client_secret: '' // Your Client Secret here
        }
    }, function (error, response, body) {
        res.send(body);
    });
});

app.use('/', route);

app.listen(port);
console.log('Your server goes on localhost:' + port);