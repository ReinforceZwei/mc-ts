import * as mc from "minecraft-protocol";
import * as config from "./config.json";

// listen console input
let stdin: NodeJS.Socket = process.openStdin();
stdin.addListener("data", (d: string) => {
    d.toString().trim();
});

let client: mc.Client = mc.createClient({
    "username": config.username,
    "host": config.host,
    "port": config.port
});
