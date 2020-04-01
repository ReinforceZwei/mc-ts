"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mc = require("minecraft-protocol");
const config = require("./settings.json");
// listen console input
let stdin = process.openStdin();
stdin.addListener("data", (d) => {
    d.toString().trim();
});
let client = mc.createClient({
    "username": config.username,
    "host": config.host,
    "port": config.port
});
//# sourceMappingURL=app.js.map