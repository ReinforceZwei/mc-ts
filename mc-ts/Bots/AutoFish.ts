import Bot from '../Bot';
import { Entity, Location } from '../DataTypes';
import { setTimeout } from 'timers';
import * as console from '../utils/ConsoleIO2';
export default class AutoFish extends Bot {
    fishingRod: Entity = new Entity(0, new Location(0, 0, 0), 0);
    lastPos: Location;
    fishingHookThreshold: number = 0.2;
    Initialize() {
        console.log('[AutoFish] Loaded');
    }
    OnSpawnEntity(Entity: Entity) {
        if (Entity.typeID == 102) {
            if (Location.CalculateDistance(this.client.playerLocation, Entity.location) < 2) {
                console.log('Threw a fishing rod');
                this.fishingRod = Entity;
                this.lastPos = new Location(Entity.location.X, Entity.location.Y, Entity.location.Z);
            }
        }
    }
    OnDestroyEntity(Entity: Entity) {
        if (this.fishingRod.ID == Entity.ID) {
            this.fishingRod.ID = 0;
        }
    }
    OnEntityMove(Entity: Entity) {
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
                        setTimeout(() => {
                            this.client.UseItem();
                        }, 800);
                    }
                }
                this.fishingRod = Entity;
                this.lastPos = new Location(Entity.location.X, Entity.location.Y, Entity.location.Z);
            }
        }
    }
}