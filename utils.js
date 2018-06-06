/*jshint esversion: 6 */
/*jslint node: true */

function remove(todos, idx) {
    var i = parseInt(idx);
    const filtered = todos.filter((value, index, todos) => {
        return index != i - 1;
    });
    return filtered;
}

function readMessage(message) {
    var pieces = message.split(' ');
    var command = pieces[0].toLowerCase();
    var predicate = pieces.slice(1).join(' ');

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
}

function echo(todos) {
    var newPieces = [];
    for(var i = 0; i < todos.length; i++) {
        newPieces.push(i + 1 + ". "  + todos[i]);
    }
    return newPieces.join("\n");
}

function addTo(item, todos) {
    todos.push(item);
    return todos;
}

function handle(command, todos, predicate) {
    // parse command, return lists and new predicate
    switch (command) {
    case 'add':
        return [`added: ${predicate}`, addTo(predicate, todos)];
    case 'list':
        return [echo(todos), todos];
    case 'remove':
        return [`removed: ${predicate}`, remove(todos, predicate)];
    default:
        return ['Invalid request', todos];
    }
    return ['Invalid request', todos];
}

module.exports = {
    remove: remove,
    readMessage: readMessage,
    echo: echo,
    add: addTo,
    handle: handle
};
