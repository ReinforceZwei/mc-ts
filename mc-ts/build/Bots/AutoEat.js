"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bot_1 = require("../Bot");
const console = require("../utils/ConsoleIO2");
const timers_1 = require("timers");
class AutoEat extends Bot_1.default {
    constructor() {
        super(...arguments);
        this.hungerThreshold = 6;
        this.eating = false;
    }
    Initialize() {
        console.log("[AutoEat] Loaded");
    }
    OnUpdateHealth(health, food) {
        this.health = health;
        this.food = food;
        // first eat
        if (((food < this.hungerThreshold) || (health < 20 && food < 20)) && !this.eating) {
            this.eating = this.findFoodAndEat();
            if (!this.eating) {
                this.client.ChangeSlot(this.lastSlot);
            }
        }
        if (food < 20 && this.eating) {
            timers_1.setTimeout(() => {
                this.eating = this.findFoodAndEat();
                if (!this.eating) {
                    this.client.ChangeSlot(this.lastSlot);
                }
            }, 200);
        }
        if (food >= 20 && this.eating) {
            this.eating = false;
            this.client.ChangeSlot(this.lastSlot);
        }
        AutoEat.isEating = this.eating;
    }
    findFoodAndEat() {
        let items = this.client.inventory.Items;
        let found = false;
        if (!this.eating) {
            this.lastSlot = this.client.currentSlot;
        }
        if (items.has(this.lastSlot) && items.get(this.lastSlot).IsFood()) {
            // no need to change slot
            found = true;
        }
        else {
            for (let i = 36; i <= 44; i++) {
                if (!items.has(i))
                    continue;
                if (items.get(i).IsFood()) {
                    found = true;
                    this.client.ChangeSlot(i - 36);
                    break;
                }
            }
        }
        if (found)
            this.client.UseItem();
        return found;
    }
    eatUntilFull() {
        let found = this.findFoodAndEat();
    }
}
AutoEat.isEating = false;
exports.default = AutoEat;
//# sourceMappingURL=AutoEat.js.map