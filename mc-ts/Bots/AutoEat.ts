import Bot from '../Bot';
import * as console from '../utils/ConsoleIO2';
import { Inventory, Item } from '../DataTypes';
export default class AutoEat extends Bot {
    lastSlot: number;
    hungerThreshold: number = 6;
    eating: boolean = false;
    static isEating: boolean = false;

    Initialize() {
        console.log("[AutoEat] Loaded");
    }

    OnUpdateHealth(health: number, food: number) {
        if (food < this.hungerThreshold || (health < 20 && food < 20)) {
            // start eating
            if (this.findFoodAndEat()) {
                this.eating = true;
            }
        }
        if (food < 20 && this.eating) {
            // keep eating until full
            if (!this.findFoodAndEat()) {
                // ran out of food
                this.eating = false;
            }
        }
        if (food >= 20 && this.eating) {
            this.eating = false;
            this.client.ChangeSlot(this.lastSlot);
        }
        AutoEat.isEating = this.eating;
    }

    findFoodAndEat(): boolean {
        let items: Map<number, Item> = this.client.inventory.Items;
        let found: boolean = false;
        if (!this.eating) {
            this.lastSlot = this.client.currentSlot;
        }
        if (items.has(this.lastSlot) && items.get(this.lastSlot).IsFood()) {
            // no need to change slot
            found = true;
        } else {
            for (let i = 36; i <= 44; i++) {
                if (!items.has(i)) continue;
                if (items.get(i).IsFood()) {
                    found = true;
                    this.client.ChangeSlot(i - 36);
                    break;
                }
            }
        }
        if (found) this.client.UseItem();
        return found;
    }
}