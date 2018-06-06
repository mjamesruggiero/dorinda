/*jshint esversion: 6 */
/*jslint node: true */

const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require("body-parser");
const utils = require('./utils');
const app = express();
const config = require('getconfig');
const messageActionUrl = config.messageActionUrl;

app.use(bodyParser.urlencoded({extended: false}));

var todos = [];

app.post('/sms', (req, res) => {
    const message = req.body.Body;
    var [cmd, predicate] = utils.readMessage(message);
    var [newPredicate, newTodos] = utils.handle(cmd, todos, predicate);
    todos = newTodos;

    const response = `${newPredicate}`;
    const twiml = new MessagingResponse();
    twiml.message(response, {action: messageActionUrl});

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

app.post('/status', (req, res) => {
    const message = req.body;
    console.log(message);
});

const server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log(`Example app listening at http://${host}:${ port}`);
});
