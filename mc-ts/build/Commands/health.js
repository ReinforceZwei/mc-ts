"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const console = require("../utils/ConsoleIO2");
let name = 'health';
exports.name = name;
function run(args, client) {
    console.log("Health: " + client.health + ", Hunger: " + client.hunger);
}
exports.run = run;
//# sourceMappingURL=health.js.map