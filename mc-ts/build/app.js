"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const readlineSync = require("readline-sync");
const mc = require("minecraft-protocol");
const Client_1 = require("./Client");
const CommandHandler = require("./CommandHandler");
const PacketHandler = require("./PacketHandler");
const BotHandler = require("./BotHandler");
const JsonIO_1 = require("./utils/JsonIO");
const console = require("./utils/ConsoleIO2");
let client;
let username;
let password;
let host;
let port = 25565;
let offline = false;
let config;
setTerminalTitle("MC-TS");
process.title = "MC-TS";
//JsonIO.write({ Settings }, 'test.json');
console.OnLine(d => {
    CommandHandler.OnCommand(d.toString().trim());
});
console.setPrefix('>');
let args = process.argv.slice(2);
if (args.length) {
    switch (args.length) {
        case 4:
            // username password host port
            username = args[0];
            if (args[1] != '-') {
                password = args[1];
            }
            host = args[2];
            port = Number.parseInt(args[3]);
            break;
        case 3:
            // username password host
            username = args[0];
            if (args[1] != '-') {
                password = args[1];
            }
            host = args[2];
            break;
        default:
            console.log("Incorrect number of arguments, ignored.");
    }
}
else {
    if (fs.existsSync('./setting.json')) {
        config = JsonIO_1.default.read('./setting.json');
        if (config.username)
            username = config.username;
        if (config.password) {
            password = config.password;
        }
        else
            offline = true;
        if (config.host)
            host = config.host;
        if (config.port)
            port = config.port;
    }
    else {
        // No any login infomation
        AskLoginInfo();
    }
}
if (CheckInfo()) {
    Login();
}
else {
    console.log("Still did not get enough infomation, exiting...");
    process.exit(1);
}
console.start();
function Login() {
    if (!password || password != '-') {
        console.log("Using online mode");
        console.log("Logging in...");
        client = new Client_1.default(mc.createClient({
            "username": username,
            "password": password,
            "host": host,
            "port": port
        }));
    }
    else {
        console.log("Using offline mode");
        console.log("Logging in...");
        client = new Client_1.default(mc.createClient({
            "username": username,
            "host": host,
            "port": port
        }));
    }
    CommandHandler.SetHandler(client);
    BotHandler.SetHandler(client);
    // packet handler must be the last to set
    PacketHandler.SetHandler(client);
}
function OnDisconnect() {
    BotHandler.UnLoadAllBot();
    console.log("Attempt to reconnect after 30 seconds...");
    setTimeout(() => {
        Login();
    }, 30000);
}
exports.OnDisconnect = OnDisconnect;
function AskLoginInfo() {
    username = readlineSync.question("Email (or username for offline mode): ");
    let _password = readlineSync.question("Password (input '-' for offline mode): ", { hideEchoBack: true });
    host = readlineSync.question("Host: ");
    let _port = readlineSync.question("Port (blank for default): ");
    if (_password != '-')
        password = _password;
    if (_port)
        port = _port;
}
function CheckInfo() {
    return (username && host && port) ? true : false;
}
function setTerminalTitle(title) {
    process.stdout.write(String.fromCharCode(27) + "]0;" + title + String.fromCharCode(7));
}
//# sourceMappingURL=app.js.map