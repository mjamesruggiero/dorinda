/*jshint esversion: 6 */
/*jslint node: true */
'use strict';

function getCurrentDate() {
    var currentDate = new Date(),
        day = currentDate.getDate(),
        month = currentDate.getMonth() + 1,
        year = currentDate.getFullYear(),
        hours = currentDate.getHours(),
        minutes = currentDate.getMinutes();
	  if (month < 10) {
	      month = "0" + month;
    }
	  if (day < 10) {
	      day = "0" + day;
    }
	  if (hours < 10) {
	      hours = "0" + hours;
    }
	  if (minutes < 10) {
	      minutes = "0" + minutes;
    }
    var dateString = year + "-" + month + "-" + day;
    var timeString = hours+ ":" + minutes;
    return dateString + " " + timeString;
}

const config = require('getconfig');
const twilio = require('twilio');

const accountSid = config.accountSid;
const authToken = config. authToken;
const fromNumber = config.fromNumber;
const toNumber = config.toNumber;

const client = new twilio(accountSid, authToken);

const message = `Greetings! The current time is: ${getCurrentDate()} 8O8IN2H5K1Y0DP3`;

client.messages.create({
    body: message,
    to: toNumber,
    from: fromNumber
}).then((message) => console.log(message.sid));

