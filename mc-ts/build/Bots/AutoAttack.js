"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const console = require("../utils/ConsoleIO2");
const Bot_1 = require("../Bot");
const DataTypes_1 = require("../DataTypes");
const timers_1 = require("timers");
class AutoAttack extends Bot_1.default {
    constructor() {
        super();
        this.attackRange = 4;
        this.attackSpeed = 4; // default attack speed
        this.attackCooldown = 250; // 1 / 4 = 0.25s = 250ms
        this.isAttacking = false;
        this.track = new Map();
        this.attack = new Map();
    }
    Initialize() {
        console.log('[AutoAttack] Loaded');
    }
    OnLogin(id) {
        this.playerID = id;
    }
    OnSpawnEntity(Entity) {
        if (Entity.IsHostile()) {
            if (DataTypes_1.Location.CalculateDistance(this.client.playerLocation, Entity.location) < this.attackRange) {
                this.attack.set(Entity.ID, Entity);
                this.startAttack();
            }
            this.track.set(Entity.ID, Entity);
        }
    }
    OnEntityMove(Entity) {
        if (this.track.has(Entity.ID)) {
            if (DataTypes_1.Location.CalculateDistance(this.client.playerLocation, Entity.location) < this.attackRange) {
                if (!this.attack.has(Entity.ID)) {
                    this.attack.set(Entity.ID, Entity);
                    this.startAttack();
                }
            }
            else {
                if (this.attack.has(Entity.ID)) {
                    this.attack.delete(Entity.ID);
                }
            }
        }
    }
    OnDestroyEntity(Entity) {
        if (this.track.has(Entity.ID)) {
            this.track.delete(Entity.ID);
            if (this.attack.has(Entity.ID)) {
                this.attack.delete(Entity.ID);
            }
        }
    }
    OnEntityProperties(prop) {
        prop.forEach(e => {
            if (e.key == 'generic.attackSpeed') {
                if (this.attackSpeed != e.value) {
                    this.attackSpeed = e.value;
                    this.UpdateAttackCooldown();
                }
            }
        });
    }
    // internal functions
    UpdateAttackCooldown() {
        this.attackCooldown = (1 / this.attackSpeed) * 1000; // TODO: add TPS factor
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
                timers_1.setTimeout(() => { this.doAttack(); }, this.attackCooldown);
            }
            else {
                this.stopAttack();
            }
        }
    }
}
exports.default = AutoAttack;
//# sourceMappingURL=AutoAttack.js.map