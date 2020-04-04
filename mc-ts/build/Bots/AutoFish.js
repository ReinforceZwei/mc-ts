"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bot_1 = require("../Bot");
const DataTypes_1 = require("../DataTypes");
const timers_1 = require("timers");
class AutoFish extends Bot_1.default {
    constructor() {
        super(...arguments);
        this.fishingRod = new DataTypes_1.Entity(0, new DataTypes_1.Location(0, 0, 0), 0);
        this.fishingHookThreshold = 0.2;
    }
    Initialize() {
        console.log('[AutoFish] Loaded');
    }
    OnSpawnEntity(Entity) {
        if (Entity.typeID == 102) {
            if (DataTypes_1.Location.CalculateDistance(this.client.playerLocation, Entity.location) < 2) {
                console.log('Threw a fishing rod');
                this.fishingRod = Entity;
                this.lastPos = new DataTypes_1.Location(Entity.location.X, Entity.location.Y, Entity.location.Z);
            }
        }
    }
    OnDestroyEntity(Entity) {
        if (this.fishingRod.ID == Entity.ID) {
            this.fishingRod.ID = 0;
        }
    }
    OnEntityMove(Entity) {
        if (Entity.typeID == 102) {
            if (this.fishingRod.ID == Entity.ID) {
                let Dx = Entity.location.X - this.lastPos.X;
                let Dy = Entity.location.Y - this.lastPos.Y;
                let Dz = Entity.location.Z - this.lastPos.Z;
                //console.log(this.lastPos.X, this.lastPos.Y, this.lastPos.Z);
                //console.log(Entity.location.X, Entity.location.Y, Entity.location.Z);
                if (Dx == 0 && Dz == 0) {
                    if (Math.abs(Dy) > this.fishingHookThreshold) {
                        console.log('Caught a fish');
                        this.client.UseItem();
                        timers_1.setTimeout(() => {
                            this.client.UseItem();
                        }, 800);
                    }
                }
                this.fishingRod = Entity;
                this.lastPos = new DataTypes_1.Location(Entity.location.X, Entity.location.Y, Entity.location.Z);
            }
        }
    }
}
exports.default = AutoFish;
//# sourceMappingURL=AutoFish.js.map