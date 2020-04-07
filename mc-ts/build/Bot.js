"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bot {
    constructor() { }
    /**
     * Set client handler after bot loaded
     * Will be called automaticlly
     * @param _client
     */
    SetHandler(_client) {
        this.client = _client;
    }
    /* Methods to override */
    /**
     * Called once on loading bots
     * */
    Initialize() { }
    /*
     * Packets that we need (for fishing) are
     * spawnEntity
     * spawnLivingEntity
     * destroyEntity
     * EntityMove
    */
    /**
     * For getting client player's entity ID
     * @param PlayerID
     */
    OnLogin(PlayerID) { }
    /**
     * Called when an entity spawned
     * @param Entity
     */
    OnSpawnEntity(Entity) { }
    /**
     * Called when an entity dead
     * @param Entity
     */
    OnDestroyEntity(Entity) { }
    /**
     * Called when an entity moved
     * @param Entity
     */
    OnEntityMove(Entity) { }
    /**
     * Called on client player properties changed
     * Modifiers were applied
     * @param properties
     */
    OnEntityProperties(properties) { }
}
exports.default = Bot;
//# sourceMappingURL=Bot.js.map