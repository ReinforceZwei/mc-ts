"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const console = require("../utils/ConsoleIO2");
let name = 'useitem';
exports.name = name;
function run(args, client) {
    client.UseItem();
    console.log('Use an item');
}
exports.run = run;
//# sourceMappingURL=useitem.js.map