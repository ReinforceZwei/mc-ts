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
    Move(location) {
        let packet = {
            x: location.X,
            y: location.Y,
            z: location.Z,
            onGround: true
        };
        this.c.write('position', packet);
        this.playerLocation = location;
    }
    UseItem(hand = 0) {
        this.c.write('use_item', { "hand": hand });
    }
    InteractEntity(ID, type = 1) {
        this.c.write('use_entity', { target: ID, mouse: type });
    }
}
exports.default = Client;
//# sourceMappingURL=Client.js.map