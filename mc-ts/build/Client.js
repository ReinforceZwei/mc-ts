"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Extens default Client methods
 * */
class Client {
    constructor(client) {
        this.c = client;
    }
    SendChat(text) {
        this.c.write('chat', { message: text });
    }
    Respawn() {
        this.c.write('client_command', { "actionId": 0 });
    }
}
exports.default = Client;
//# sourceMappingURL=Client.js.map