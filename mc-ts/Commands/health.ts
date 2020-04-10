import Client from '../Client';
import * as console from '../utils/ConsoleIO2';
let name = 'health';
function run(args: string[], client: Client) {
    console.log("Health: " + client.health + ", Hunger: " + client.hunger);
}
export { name, run }