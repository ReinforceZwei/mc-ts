import Bot from '../Bot';
import { Entity } from '../DataTypes';
export default class AutoFish extends Bot {
    Initialize() {
        console.log('[AutoFish] Loaded');
    }
    OnSpawnEntity(Entity: Entity) {
        if (Entity.typeID == 102) {
            console.log('A fishing rod detected');
        }
    }
}