import Client from './Client';
import * as commands from './Commands/index';
let client: Client;
function Run(name: string, args: string[]): boolean {
    if (commands[name]) {
        commands[name].run(args, client);
        return true;
    } else {
        return false;
    }
}
function SetHandler(_client: Client) {
    client = _client;
}
function OnCommand(command: string) {
    if (command.startsWith('/')) {
        var args = command.slice(1).split(/ +/);
        var commandName = args.shift().toLowerCase();
        if (!Run(commandName, args)) {
            // command not found, forward to server
            client.SendChat(command);
        }
    } else {
        // not a command
        client.SendChat(command);
    }
}
export { Run, commands, SetHandler, OnCommand }