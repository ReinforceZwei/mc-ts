"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DataTypes_1 = require("./DataTypes");
const ChatParser_1 = require("./utils/ChatParser");
const console = require("./utils/ConsoleIO2");
let client;
function SetHandler(_client) {
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
    client.c.on('spawn_entity', OnSpawnEntity);
    client.c.on('spawn_entity_living', OnSpawnEntity);
    client.c.on('rel_entity_move', OnEntityMove);
    client.c.on('entity_move_look', OnEntityMove);
    client.c.on('entity_teleport', OnEntityTeleport);
    client.c.on('entity_destroy', OnDestroyEntity);
}
exports.SetHandler = SetHandler;
// Events that must be handled
function OnConnect() {
    console.log('Connected, joining...');
}
function OnLogin(packet) {
    console.log('Successfully joined');
    client.bots.forEach(e => {
        e.OnLogin(packet.entityId);
    });
}
function OnChat(packet) {
    //console.log(packet);
    console.log(ChatParser_1.default(JSON.parse(packet.message)));
}
function OnDisconnect() {
    console.log('You have been disconnected from the server.');
    process.exit(0);
}
function OnKick(packet) {
    console.log("Kicked for reason: " + packet.reason);
}
function OnError(err) {
    console.log(err.message);
}
// variables
// Entity handling
let Entities = new Array();
// Events for bots to work
function OnPosition(packet) {
    let x = packet.x;
    let y = packet.y;
    let z = packet.z;
    let location = new DataTypes_1.Location(x, y, z);
    client.playerLocation = location;
    client.c.write('teleport_confirm', { teleportId: packet.teleportId });
}
function OnSpawnEntity(packet) {
    let EntityID = packet.entityId;
    let type = packet.type;
    let X = packet.x;
    let Y = packet.y;
    let Z = packet.z;
    let location = new DataTypes_1.Location(X, Y, Z);
    let entity = new DataTypes_1.Entity(EntityID, location, type);
    //Entities.splice(EntityID, 0, entity);
    Entities[EntityID] = entity;
    client.bots.forEach(e => {
        e.OnSpawnEntity(entity);
    });
}
function OnEntityMove(packet) {
    let EntityID = packet.entityId;
    if (Entities[EntityID]) {
        let Dx = packet.dX / (128 * 32);
        let Dy = packet.dY / (128 * 32);
        let Dz = packet.dZ / (128 * 32);
        let l = Entities[EntityID].location;
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
    let EntityID = packet.entityId;
    if (Entities[EntityID]) {
        let x = packet.x;
        let y = packet.y;
        let z = packet.z;
        Entities[EntityID].location = new DataTypes_1.Location(x, y, z);
        client.bots.forEach(e => {
            e.OnEntityMove(Entities[EntityID]);
        });
    }
}
function OnDestroyEntity(packet) {
    let EntitiesID = packet.entityIds;
    EntitiesID.forEach(ID => {
        if (Entities[ID]) {
            client.bots.forEach(e => {
                let tmp = new DataTypes_1.Entity(Entities[ID].ID, Entities[ID].location, Entities[ID].typeID);
                e.OnDestroyEntity(tmp);
            });
            //Entities.splice(ID, 1);
            delete Entities[ID];
        }
    });
}
//# sourceMappingURL=PacketHandler.js.map