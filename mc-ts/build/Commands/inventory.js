"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DataTypes_1 = require("../DataTypes");
const console = require("../utils/ConsoleIO2");
let name = 'inventory';
exports.name = name;
function run(args, client) {
    let output = [];
    output.push("[*] is hotbar");
    output.push("[#] is inventory");
    client.inventory.Items.forEach((item, slot) => {
        let _slot = slot;
        if (slot >= 36 && slot <= 44) {
            _slot -= 35;
            output.push("*" + _slot + " Type: " + DataTypes_1.ItemType[item.Type] + ", Count: " + item.Count);
        }
        else {
            output.push("#" + slot + " Type: " + DataTypes_1.ItemType[item.Type] + ", Count: " + item.Count);
        }
    });
    output.push("Your selected Hotbar is *" + (client.currentSlot + 1));
    console.log(output.join('\n'));
}
exports.run = run;
//# sourceMappingURL=inventory.js.map