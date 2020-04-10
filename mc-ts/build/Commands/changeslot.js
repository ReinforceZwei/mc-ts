"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const console = require("../utils/ConsoleIO2");
let name = 'slot';
exports.name = name;
function run(args, client) {
    if (args.length == 1) {
        let slot = Number.parseInt(args[0]);
        if (slot >= 1 && slot <= 9) {
            client.ChangeSlot(slot - 1);
            console.log("Changed to *" + slot);
            return;
        }
    }
    console.log("Missing or incorrect slotID (Must be 1-9)");
}
exports.run = run;
//# sourceMappingURL=changeslot.js.map