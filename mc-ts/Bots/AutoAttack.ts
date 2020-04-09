import * as console from '../utils/ConsoleIO2';
import Bot from '../Bot';
import { Entity, Location } from '../DataTypes';
import { setTimeout } from 'timers';

export default class AutoAttack extends Bot {
    track: Map<number, Entity>;
    attack: Map<number, Entity>;
    attackRange: number = 4
    attackSpeed: number = 4; // default attack speed
    attackCooldown: number = 250; // 1 / 4 = 0.25s = 250ms
    isAttacking: boolean = false;
    playerID: number;

    constructor() {
        super();
        this.track = new Map<number, Entity>();
        this.attack = new Map<number, Entity>();
    }
    Initialize() {
        console.log('[AutoAttack] Loaded');
    }
    OnLogin(id: number) {
        this.playerID = id;
    }
    OnSpawnEntity(Entity: Entity) {
        if (Entity.IsHostile()) {
            if (Location.CalculateDistance(this.client.playerLocation, Entity.location) < this.attackRange) {
                this.attack.set(Entity.ID, Entity);
                this.startAttack();
            }
            this.track.set(Entity.ID, Entity);
        }
    }
    OnEntityMove(Entity: Entity) {
        if (this.track.has(Entity.ID)) {
            if (Location.CalculateDistance(this.client.playerLocation, Entity.location) < this.attackRange) {
                if (!this.attack.has(Entity.ID)) {
                    this.attack.set(Entity.ID, Entity);
                    this.startAttack();
                }
            } else {
                if (this.attack.has(Entity.ID)) {
                    this.attack.delete(Entity.ID);
                }
            }
        }
    }
    OnDestroyEntity(Entity: Entity) {
        if (this.track.has(Entity.ID)) {
            this.track.delete(Entity.ID);
            if (this.attack.has(Entity.ID)) {
                this.attack.delete(Entity.ID);
            }
        }
    }
    OnEntityProperties(prop: Array<any>) {
        prop.forEach(e => {
            if (e.key == 'generic.attackSpeed') {
                if (this.attackSpeed != e.value) {
                    this.attackSpeed = e.value;
                    this.UpdateAttackCooldown();
                }
            }
        })
    }

    // internal functions
    UpdateAttackCooldown() {
        this.attackCooldown = (1 / this.attackSpeed) * 1000; // TODO: add TPS factor
        //console.log("Attack speed: " + this.attackSpeed);
    }
    startAttack() {
        if (!this.isAttacking) {
            this.isAttacking = true;
            this.doAttack();
        }
    }
    stopAttack() {
        if (this.isAttacking) {
            this.isAttacking = false;
        }
    }
    doAttack() {
        if (this.isAttacking) {
            if (this.attack.size > 0) {
                this.attack.forEach(e => {
                    this.client.InteractEntity(e.ID);
                });
                setTimeout(() => { this.doAttack() }, this.attackCooldown);
            } else {
                this.stopAttack();
            }
            //console.log("Attack speed: " + this.attackSpeed);
        }
    }
}