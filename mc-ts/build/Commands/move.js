"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let name = 'move';
exports.name = name;
function run(args, client) {
    let location = client.playerLocation;
    location.X += 1;
    client.Move(location);
    console.log('Moved');
}
exports.run = run;
//# sourceMappingURL=move.js.map