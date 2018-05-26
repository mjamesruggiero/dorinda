/*jshint esversion: 6 */
/*jslint node: true */

var express = require('express');

function readMessage(message) {
    var pieces = message.split(' ');
    var command = pieces[0];

    switch (message) {
    case 'add':
        console.log('You wanted to add');
        break;
    case 'list':
        console.log('You wanted to list');
        break;
    case 'remove':
        console.log('You wanted to remove');
        break;
    default:
        console.log('Sorry, we are out of ' + command + '.');
    }
}

var app = express();

app.get('/', function(req, res) {
    res.send('Hello, world');
});

app.get('/sms', function(req, res) {
    const fromCountry = req.query.FromCountry;
    const open = '<?xml version="1.0" encoding="UTF-8"?>';
    const response = `<Response><Message>fromCountry = ${fromCountry}</Message></Response>`;
    res.send(open + response);
});

var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log(`Example app listening at http://${host}:${ port}`);
});
