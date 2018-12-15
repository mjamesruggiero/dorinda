/*jshint esversion: 6 */
/*jslint node: true */

const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const bodyParser = require('body-parser');
const utils = require('./utils');
const app = express();

const config = require('getconfig');
const messageActionUrl = config.messageActionUrl;

app.use(bodyParser.urlencoded({extended: false}));

var todos = [];

app.get('/', (request, response) => {
    response.writeHead(200, {'Content-Type': 'text/xml'});
    response.end('<head><body><h1>This is dorinda</h1></body></head>');
});

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

app.post('/voice', (request, response) => {
    const twiml = new VoiceResponse();
    const moderator = config.moderator;
    const allowed = config.allowedConferenceNumber;
    const myPhoneNumber = config.michaelsPhoneNumber;

    const dial = twiml.dial();

    if(request.body.From === allowed || request.body.from === myPhoneNumber){
        // if caller is MODERATOR, start conference when they join
        // and end when they leave
        if (request.body.From === moderator) {
            dial.conference('My conference', {
                startConferenceOnEnter: true,
                endConferenceOnExit: true
            });
        } else {
            // otherwise have caller join as regular participant
            dial.conference('My conference', {
                startConferenceOnEnter: false
            });
        }
    } else {
        // reject them
        twiml.reject();
    }

    // render
    response.type('text/xml');
    response.send(twiml.toString());
});

const server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log(`Dorinda is in the house, listening at http://${host}:${ port}`);
});
