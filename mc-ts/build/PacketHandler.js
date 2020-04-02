"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ChatParser_1 = require("./utils/ChatParser");
let client;
function SetHandler(_client) {
    client = _client;
    client.c.on("chat", OnChat);
    client.c.on("connect", OnConnect);
    client.c.on("disconnect", OnDisconnect);
    client.c.on("end", OnDisconnect);
    client.c.on('kick_disconnect', OnKick);
    client.c.on('error', OnError);
}
exports.SetHandler = SetHandler;
// Events that must be handled
function OnConnect() {
    console.log('Successfully connected');
}
function OnChat(packet) {
    console.log(packet);
    console.log(ChatParser_1.default(JSON.parse(packet.message)));
}
function OnDisconnect() {
    console.log('You have been disconnected from the server.');
    process.exit(0);
}
function OnKick(packet) {
    console.log("Kicked for reason: " + packet.reason);
}
function OnError(err) {
    console.error(err.message);
}
//# sourceMappingURL=PacketHandler.js.map