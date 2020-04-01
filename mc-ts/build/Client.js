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
}
exports.default = Client;
//# sourceMappingURL=Client.js.map