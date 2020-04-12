import Client from './Client';
import { Entity, Location, Inventory, Item } from './DataTypes';
import ChatParser from './utils/ChatParser';
import * as console from './utils/ConsoleIO2';
let client: Client;
function SetHandler(_client: Client) {
    client = _client;
    client.c.on("chat", OnChat);
    client.c.on("connect", OnConnect);
    client.c.on("disconnect", OnDisconnect);
    client.c.on("end", OnDisconnect);
    client.c.on('kick_disconnect', OnKick);
    client.c.on('error', OnError);
    // for bots
    client.c.on('login', OnLogin);
    client.c.on('position', OnPosition);
    // entity related
    client.c.on('spawn_entity', OnSpawnEntity);
    client.c.on('spawn_entity_living', OnSpawnEntity);
    client.c.on('rel_entity_move', OnEntityMove);
    client.c.on('entity_move_look', OnEntityMove);
    client.c.on('entity_teleport', OnEntityTeleport);
    client.c.on('entity_destroy', OnDestroyEntity);
    // entity_update_attributes
    client.c.on('entity_update_attributes', OnEntityProperties);
    // Inventory related
    client.c.on('window_items', OnWindowItems);
    client.c.on('set_slot', OnSetSlot);
    client.c.on('held_item_slot', OnHeldItemSlot);
    // player
    client.c.on('update_health', OnUpdateHealth);
    client.c.on('experience', OnExperience);
}
export { SetHandler }
// Events that must be handled
function OnConnect() {
    console.log('Connected, joining...');
}
function OnLogin(packet) {
    console.log('Successfully joined');
    client.playerID = packet.entityId;
    client.bots.forEach(e => {
        e.OnLogin(packet.entityId);
    })
}
function OnChat(packet: any) {
    //console.log(packet);
    console.log(ChatParser(JSON.parse(packet.message)));
}
function OnDisconnect() {
    console.log('You have been disconnected from the server.');
    process.exit(0);
}
function OnKick(packet: any) {
    console.log("Kicked for reason: " + packet.reason);
}
function OnError(err: Error) {
    //console.log(err.message);
}

// variables
// Entity handling
let Entities: Map<number, Entity> = new Map<number, Entity>();

// Events for bots to work
function OnPosition(packet) {
    let x = packet.x;
    let y = packet.y;
    let z = packet.z;
    let location: Location = new Location(x, y, z);
    client.playerLocation = location;
    client.c.write('teleport_confirm', { teleportId: packet.teleportId });
}
// entity related
function OnSpawnEntity(packet) {
    let EntityID: number = packet.entityId;
    let type: number = packet.type;
    let X: number = packet.x;
    let Y: number = packet.y;
    let Z: number = packet.z;
    let location: Location = new Location(X, Y, Z);
    let entity: Entity = new Entity(EntityID, location, type);
    //Entities.splice(EntityID, 0, entity);
    Entities.set(EntityID, entity);
    client.bots.forEach(e => {
        e.OnSpawnEntity(entity);
    })
}
function OnEntityMove(packet) {
    let EntityID: number = packet.entityId;
    if (Entities.has(EntityID)) {
        let Dx: number = packet.dX / (128 * 32);
        let Dy: number = packet.dY / (128 * 32);
        let Dz: number = packet.dZ / (128 * 32);
        let e: Entity = Entities.get(EntityID);
        let l: Location = e.location;
        l.X += Dx;
        l.Y += Dy;
        l.Z += Dz;
        e.location = l;
        Entities.set(EntityID, e);
        client.bots.forEach(e => {
            e.OnEntityMove(Entities.get(EntityID));
        });
    }
}
function OnEntityTeleport(packet) {
    let EntityID: number = packet.entityId;
    if (Entities.has(EntityID)) {
        let x: number = packet.x;
        let y: number = packet.y;
        let z: number = packet.z;
        let location = new Location(x, y, z);
        let e = Entities.get(EntityID);
        e.location = location;
        Entities.set(EntityID, e);
        client.bots.forEach(e => {
            e.OnEntityMove(Entities.get(EntityID));
        });
    }
}
function OnDestroyEntity(packet) {
    let EntitiesID: Array<number> = packet.entityIds;
    EntitiesID.forEach(ID => {
        if (Entities.has(ID)) {
            client.bots.forEach(e => {
                let entity = Entities.get(ID);
                let tmp: Entity = new Entity(entity.ID, entity.location, entity.typeID);
                e.OnDestroyEntity(tmp);
            });
            Entities.delete(ID);
        }
    })
}
//
function OnEntityProperties(packet) {
    if (packet.entityId == client.playerID) {
        // apply modifiers
        packet.properties.forEach(prop => {
            if (prop.modifiers.length > 0) {
                // operation
                let base: number = prop.value;
                let op0: number[] = [];
                let op1: number[] = [];
                let op2: number[] = [];
                prop.modifiers.forEach(e => {
                    switch (e.operation) {
                        case 0: op0.push(e.amount); break;
                        case 1: op1.push(e.amount); break;
                        case 2: op2.push(e.amount + 1); break;
                    }
                });
                if (op0.length > 0) base += op0.reduce((a, b) => a + b);
                if (op1.length > 0) base *= 1 + op1.reduce((a, b) => a + b);
                if (op2.length > 0) base *= op2.reduce((a, b) => a * b);
                prop.value = base;
            }
            delete prop.modifiers;
        });
        client.bots.forEach(e => {
            e.OnEntityProperties(packet.properties);
        })
    }
}
// Inventory related
function OnWindowItems(packet) {
    if (packet.windowId == 0) {
        let inventory: Inventory = new Inventory();
        inventory.ID = 0;
        packet.items.forEach((e, key) => {
            if (e.present) {
                inventory.Items.set(key, new Item(e.itemId, e.itemCount));
            }
        });
        client.inventory = inventory;
    }
}
function OnSetSlot(packet) {
    if (packet.windowId == 0) {
        if (packet.item.present) {
            client.inventory.Items.set(packet.slot, new Item(packet.item.itemId, packet.item.itemCount));
        } else {
            if (client.inventory.Items.has(packet.slot)) {
                client.inventory.Items.delete(packet.slot);
            }
        }
    }
}
function OnHeldItemSlot(packet) {
    client.currentSlot = packet.slot;
}
function OnUpdateHealth(packet) {
    client.health = packet.health;
    client.hunger = packet.food;
    client.bots.forEach(e => {
        e.OnUpdateHealth(packet.health, packet.food);
    })
}
function OnExperience(packet) {
    client.level = packet.level;
}