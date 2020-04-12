import * as mc from "minecraft-protocol";
import Bot from './Bot';
import { Location, Inventory } from "./DataTypes";

/**
 * Extens default Client methods
 * */
export default class Client {
    c: mc.Client;
    bots: Bot[];
    playerLocation: Location;
    playerID: number;
    inventory: Inventory;
    currentSlot: number;
    health: number;
    hunger: number;
    level: number;
    constructor(client: mc.Client) {
        this.c = client;
    }
    SendChat(text: string): void {
        this.c.write('chat', { message: text });
    }
    Respawn(): void {
        this.c.write('client_command', { "actionId": 0 });
    }
    Move(location: Location) {
        let packet = {
            x: location.X,
            y: location.Y,
            z: location.Z,
            onGround: true
        }
        this.c.write('position', packet);
        this.playerLocation = location;
    }
    UseItem(hand: number = 0) {
        this.c.write('use_item', { "hand": hand });
    }
    InteractEntity(ID: number, type: number = 1) {
        this.c.write('use_entity', { target: ID, mouse: type });
    }
    /**
     * Change current slot
     * @param slot slot is zero-based
     */
    ChangeSlot(slot: number) {
        if (slot >= 0 && slot <= 8) {
            this.c.write('held_item_slot', { slotId: slot });
            this.currentSlot = slot;
        }
    }
}