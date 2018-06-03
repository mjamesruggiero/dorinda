/*jshint esversion: 6 */
/*jslint node: true */

function remove(todos, idx) {
    const filtered = todos.filter((value, index, todos) => {
        return index != idx - 1;
    });
    return filtered;
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

module.exports = {
    remove: remove,
    readMessage: readMessage
};
