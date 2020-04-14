"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const console = require("../utils/ConsoleIO2");
let name = 'quit';
exports.name = name;
function run(args, client) {
    client.c.end('');
    console.log("Quitting...");
    process.exit(0);
}
exports.run = run;
//# sourceMappingURL=quit.js.map