"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commands = require("./Commands/index");
exports.commands = commands;
let client;
function Run(name, args) {
    if (commands[name]) {
        commands[name].run(args, client);
        return true;
    }
    else {
        return false;
    }
}
exports.Run = Run;
function SetHandler(_client) {
    client = _client;
}
exports.SetHandler = SetHandler;
function OnCommand(command) {
    if (command.startsWith('/')) {
        var args = command.slice(1).split(/ +/);
        var commandName = args.shift().toLowerCase();
        if (!Run(commandName, args)) {
            // command not found, forward to server
            client.SendChat(command);
        }
    }
    else {
        // not a command
        client.SendChat(command);
    }
}
exports.OnCommand = OnCommand;
//# sourceMappingURL=CommandHandler.js.map