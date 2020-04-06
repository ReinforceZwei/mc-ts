"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const console = require("../utils/ConsoleIO2");
let name = 'respawn';
exports.name = name;
function run(args, client) {
    client.Respawn();
    console.log('You have been respawned.');
}
exports.run = run;
//# sourceMappingURL=respawn.js.map