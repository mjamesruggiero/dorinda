/*jshint esversion: 6 */
/*jslint node: true */

const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require("body-parser");
const utils = require('./utils');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));

var todos = [];

app.post('/sms', (req, res) => {
    const message = req.body.Body;
    console.log(`message: ${message}`);
    var [cmd, predicate] = utils.readMessage(message);

    const response = `${cmd} predicate: ${predicate}`;
    const twiml = new MessagingResponse();
    twiml.message(response);

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

const server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log(`Example app listening at http://${host}:${ port}`);
});
