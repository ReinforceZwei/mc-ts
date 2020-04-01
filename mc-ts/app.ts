import * as mc from "minecraft-protocol";
import Client from "./Client";
import * as config from "./settings.json";
import * as CommandHandler from './CommandHandler';

import ChatParser from "./utils/ChatParser";

// listen console input
let stdin: NodeJS.Socket = process.openStdin();
stdin.addListener("data", (d: string) => {
    CommandHandler.OnCommand(d.toString().trim());
});

let client: Client = new Client(mc.createClient({
    "username": config.username,
    "host": config.host,
    "port": config.port
}));

// TODO: Setup Event handler
client.c.on('connect', () => {
    console.log('Successfully connected');
});
client.c.on('chat', (packet: any) => {
    console.log(ChatParser(JSON.parse(packet.message), {}));
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