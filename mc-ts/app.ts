import * as fs from 'fs';
import * as readlineSync from 'readline-sync';
import * as readline from 'readline';
import * as mc from "minecraft-protocol";
import Client from "./Client";
import * as CommandHandler from './CommandHandler';
import * as PacketHandler from './PacketHandler';
import * as BotHandler from './BotHandler';
import JsonIO from './utils/JsonIO';
import * as console from './utils/ConsoleIO2';

let client: Client

let username: string;
let password: string;
let host: string;
let port: number = 25565;
let offline: boolean = false;

let config: any;

setTerminalTitle("MC-TS");
process.title = "MC-TS";

console.OnLine(d => {
    CommandHandler.OnCommand(d.toString().trim());
});
console.setPrefix('> ');

let args: string[] = process.argv.slice(2);
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
} else {
    if (fs.existsSync('./setting.json')) {
        config = JsonIO.read('./setting.json');
        if (config.username) username = config.username;
        if (config.password) { password = config.password } else offline = true;
        if (config.host) host = config.host;
        if (config.port) port = config.port;
    } else {
        // No any login infomation
        AskLoginInfo();
    }
}
if (CheckInfo()) {
    if (!password) {
        console.log("Using offline mode");
        console.log("Logging in...");
        client = new Client(mc.createClient({
            "username": username,
            "host": host,
            "port": port
        }));
    } else {
        console.log("Using online mode");
        console.log("Logging in...");
        client = new Client(mc.createClient({
            "username": username,
            "password": password,
            "host": host,
            "port": port
        }));
    }
} else {
    console.log("Still did not get enough infomation, exiting...");
    process.exit(1);
}

/*
// listen console input
let stdin: NodeJS.Socket = process.openStdin();
stdin.addListener("data", (d: string) => {
    CommandHandler.OnCommand(d.toString().trim());
    //process.stdout.write("\r\x1b[K");
});

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true
});
rl.prompt();
rl.on('line', (d: string) => {
    CommandHandler.OnCommand(d.toString().trim());
    //rl.prompt();
}).on('close', () => {
    client.c.end('User terminate');
    process.exit(0);
});
setInterval(() => {
    rl.pause();
    rl.write('LOLOLOL\n');
    rl.resume();
}, 5000);
*/



CommandHandler.SetHandler(client);
BotHandler.SetHandler(client);
// packet handler must be the last to set
PacketHandler.SetHandler(client);

console.start();

function AskLoginInfo() {
    username = readlineSync.question("Email (or username for offline mode): ");
    let _password: string = readlineSync.question("Password (input '-' for offline mode): ", { hideEchoBack: true });
    host = readlineSync.question("Host: ");
    let _port: number = readlineSync.question("Port (blank for default): ");
    if (_password != '-') password = _password;
    if (_port) port = _port;
}
function CheckInfo(): boolean {
    return (username && host && port) ? true : false;
}
function setTerminalTitle(title) {
    process.stdout.write(
        String.fromCharCode(27) + "]0;" + title + String.fromCharCode(7)
    );
}