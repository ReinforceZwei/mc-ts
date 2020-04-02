import * as mc from "minecraft-protocol";
import Bot from './Bot';

/**
 * Extens default Client methods
 * */
export default class Client {
    c: mc.Client;
    bots: Bot[];
    constructor(client: mc.Client) {
        this.c = client;
    }
    SendChat(text: string): void {
        this.c.write('chat', { message: text });
    }
    Respawn(): void {
        this.c.write('client_command', { "actionId": 0 });
    }
}