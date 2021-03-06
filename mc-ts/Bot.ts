﻿import Client from './Client';
import { Location, Entity } from './DataTypes';
export default abstract class Bot {
    protected client: Client;

    constructor() { }

    /**
     * Set client handler after bot loaded
     * Will be called automaticlly
     * @param _client
     */
    public SetHandler(_client: Client): void {
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
    OnLogin(PlayerID: number): void { }

    /**
     * Called when an entity spawned
     * @param Entity
     */
    OnSpawnEntity(Entity: Entity): void { }

    /**
     * Called when an entity dead
     * @param Entity
     */
    OnDestroyEntity(Entity: Entity): void { }

    /**
     * Called when an entity moved
     * @param Entity
     */
    OnEntityMove(Entity: Entity): void { }

    /**
     * Called on client player properties changed
     * Modifiers were applied
     * @param properties
     */
    OnEntityProperties(properties: Array<any>): void { }

    /**
     * Called when player health or hunger changed
     * @param health 0-20, 0 means dead
     * @param food 0-20
     */
    OnUpdateHealth(health: number, food: number): void { }
}