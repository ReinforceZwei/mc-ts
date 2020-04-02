import Client from './Client';
import { Entity, Location } from './DataTypes';
import ChatParser from './utils/ChatParser';
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
    client.c.on('spawn_entity', OnSpawnEntity);
    client.c.on('spawn_entity_living', OnSpawnEntity);
    client.c.on('rel_entity_move', OnEntityMove);
    client.c.on('entity_move_look', OnEntityMove);
    client.c.on('entity_destroy', OnDestroyEntity);
}
export { SetHandler }
// Events that must be handled
function OnConnect() {
    console.log('Connected, joining...');
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
    console.error(err.message);
}

// variables
// Entity handling
let Entities: Array<Entity> = new Array<Entity>();

// Events for bots to work
function OnLogin(packet) {
    console.log('Successfully joined');
    client.bots.forEach(e => {
        e.OnLogin(packet.entityId);
    })
}
function OnSpawnEntity(packet) {
    let EntityID: number = packet.entityId;
    let type: number = packet.type;
    let X: number = packet.x;
    let Y: number = packet.y;
    let Z: number = packet.z;
    let location: Location = new Location(X, Y, Z);
    let entity: Entity = new Entity(EntityID, location, type);
    //Entities.splice(EntityID, 0, entity);
    Entities[EntityID] = entity;
    client.bots.forEach(e => {
        e.OnSpawnEntity(entity);
    })
}
function OnEntityMove(packet) {
    let EntityID: number = packet.entityId;
    if (Entities[EntityID]) {
        let Dx: number = packet.dX;
        let Dy: number = packet.dY;
        let Dz: number = packet.dZ;
        let location: Location = new Location(Dx, Dy, Dz);
        let l: Location = Entities[EntityID].location;
        l.X += Dx;
        l.Y += Dy;
        l.Z += Dz;
        Entities[EntityID].location = l;
        client.bots.forEach(e => {
            e.OnEntityMove(Entities[EntityID]);
        });
    }
}
function OnEntityTeleport(packet) {
    // TODO: fuck my life
}
function OnDestroyEntity(packet) {
    let EntitiesID: Array<number> = packet.entityIds;
    EntitiesID.forEach(ID => {
        if (Entities[ID]) Entities.splice(ID, 1);
    })
}