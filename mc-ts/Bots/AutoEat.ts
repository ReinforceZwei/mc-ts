import Bot from '../Bot';
import * as console from '../utils/ConsoleIO2';
import { Inventory, Item } from '../DataTypes';
import { setTimeout } from 'timers';
export default class AutoEat extends Bot {
    lastSlot: number;
    hungerThreshold: number = 6;
    eating: boolean = false;
    static isEating: boolean = false;
    health: number;
    food: number;

    Initialize() {
        console.log("[AutoEat] Loaded");
    }

    OnUpdateHealth(health: number, food: number) {
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
            setTimeout(() => {
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

    eatUntilFull() {
        let found = this.findFoodAndEat();
    }
}