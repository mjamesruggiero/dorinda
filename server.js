/*jshint esversion: 6 */
/*jslint node: true */

const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: false}));

var todos = [];

app.post('/sms', (req, res) => {
    const message = req.body.Body;
    console.log(`message: ${message}`);
    var [cmd, predicate] = readMessage(message);

    const response = `${cmd} predicate: ${predicate}`;
    const twiml = new MessagingResponse();
    //const response = 'This is a test response';
    twiml.message(response);

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

function remove(todos, idx) {
    var newList = [];
    for(var i = 0; i <= todos.length; i++) {
        var num = i + 1;
        if(idx === num) {
            // do nothing
        } else {
            newList.push(list[i]);
        }
    }
    return newList;
}

function readMessage(message) {
    var pieces = message.split(' ');
    var command = pieces[0].toLowerCase();
    var predicate = pieces.slice(1).join(' ');
    console.log(`[readMessage] command: ${command} predicate: ${predicate}`);

    switch (command) {
    case 'add':
        return ['add', predicate];
    case 'list':
        return ['list'];
    case 'remove':
        return ['remove', predicate];
    default:
        return ['unknown', predicate];
    }
    return ['unknown', predicate];
}

const server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log(`Example app listening at http://${host}:${ port}`);
});
