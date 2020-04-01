import Client from './Client';
import ChatParser from './utils/ChatParser';
let client: Client;
function SetHandler(_client: Client) {
    client = _client;
    client.c.on("chat", OnChat);
    client.c.on("connect", OnConnect);
    client.c.on("disconnect", OnDisconnect);
    client.c.on("end", OnDisconnect);
    client.c.on('kick_disconnect', OnKick);
    client.c.on('error', OnError);
}

// Events that must be handled
function OnConnect() {
    console.log('Successfully connected');
}
function OnChat(packet: any) {
    //console.log(packet);
    console.log(ChatParser(JSON.parse(packet.message), {}));
}
function OnDisconnect() {
    console.log('You have been disconnected from the server.');
    process.exit(0);
}
function OnKick(packet: any) {
    console.log("Kicked for reason: " + packet.reason);
}
function OnError(err: Error) {
    console.error(err.message);
}
export { SetHandler }