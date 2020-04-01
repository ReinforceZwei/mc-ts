import * as mc from "minecraft-protocol";

/**
 * Extens default Client methods
 * */
export default class Client {
    c: mc.Client;
    constructor(client: mc.Client) {
        this.c = client;
    }
    SendChat(text: string): void {
        this.c.write('chat', { message: text });
    }
}