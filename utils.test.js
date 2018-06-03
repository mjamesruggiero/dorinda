/*jshint esversion: 6 */
/*jslint node: true */

const utils = require('./utils');

test('#remove removes elements from todo list', () => {
    expect(utils.remove(["one", "two", "three"], 1)).toEqual(["two", "three"]);
});

test('#readMessage parses message into command and predicate', () => {
    expect(utils.readMessage("add buy the milk")).toEqual(["add", "buy the milk"]);
});

test('#readMessage sees unexpected messages as having unknown commands', () => {
    expect(utils.readMessage("kill the messenger")).toEqual(["unknown", "the messenger"]);
});
