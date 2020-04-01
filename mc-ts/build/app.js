"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mc = require("minecraft-protocol");
const Client_1 = require("./Client");
const config = require("./settings.json");
const CommandHandler = require("./CommandHandler");
const ChatParser_1 = require("./utils/ChatParser");
// listen console input
let stdin = process.openStdin();
stdin.addListener("data", (d) => {
    CommandHandler.OnCommand(d.toString().trim());
});
let client = new Client_1.default(mc.createClient({
    "username": config.username,
    "host": config.host,
    "port": config.port
}));
// TODO: Setup Event handler
client.c.on('connect', () => {
    console.log('Successfully connected');
});
client.c.on('chat', (packet) => {
    console.log(ChatParser_1.default(JSON.parse(packet.message), {}));
});
client.c.on('disconnect', () => {
    console.log('You have been disconnected from the server.');
    process.exit(0);
});
client.c.on('end', () => {
    console.log('You have been disconnected from the server.');
    process.exit(0);
});
CommandHandler.SetHandler(client);
//# sourceMappingURL=app.js.map