'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = chat;
function chat(socket) {
    socket.on('say', function (data) {
        console.log(data);
    });
}