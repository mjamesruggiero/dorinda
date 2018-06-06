/*jshint esversion: 6 */
/*jslint node: true */

const utils = require('./utils');

test('#remove removes elements from todo list', () => {
    expect(utils.remove(["one", "two", "three"], "1")).toEqual(["two", "three"]);
});

describe('#readMessage', () => {
    test('parses message into command and predicate', () => {
        expect(utils.readMessage("add buy the milk")).toEqual(["add", "buy the milk"]);
    });

    test('sees unexpected messages as having unknown commands', () => {
        expect(utils.readMessage("kill the messenger")).toEqual(["unknown", "the messenger"]);
    });
});

test('#echo returns string representation of todos', () => {
    const todos = ['Get the milk', 'Fix the foo'];
    expect(utils.echo(todos)).toEqual("1. Get the milk\n2. Fix the foo");
});

test('#add adds to the list of todos', () => {
    const todos = ['Get the milk', 'Fix the foo'];
    expect(utils.add('Drink water', todos)).toEqual(['Get the milk', 'Fix the foo', 'Drink water']);
});

describe('#handle', () => {
    var todos = [];
    beforeEach(() => {
        todos = ['Get the milk', 'Fix the foo'];
    });

    test('returns list item and list when command is "add"', () => {
        expect(utils.handle('add', todos, 'Drink water')).toEqual(
            ['added: Drink water', ['Get the milk', 'Fix the foo', 'Drink water']]
        );
    });

    test('returns stringified list and the todos when command is "list"', () => {
        expect(utils.handle('list', todos, '')).toEqual([utils.echo(todos), todos]);
    });

    test('returns index and shortened list command is "remove"', () => {
        expect(utils.handle('remove', todos, '2')).toEqual(['removed: 2', ['Get the milk']]);
    });

    test('returns placeholder predicate and todos index command is unknown', () => {
        expect(utils.handle('foo', todos, '2')).toEqual(['Invalid request', todos]);
    });
});
