"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bot_1 = require("../Bot");
class AutoFish extends Bot_1.default {
    Initialize() {
        console.log('[AutoFish] Loaded');
    }
    OnSpawnEntity(Entity) {
        if (Entity.typeID == 102) {
            console.log('A fishing rod detected');
        }
    }
}
exports.default = AutoFish;
//# sourceMappingURL=AutoFish.js.map