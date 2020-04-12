import Client from '../Client';
import * as console from '../utils/ConsoleIO2';
let name = 'exp';
function run(args: string[], client: Client) {
    console.log("Current EXP level: " + client.level);
}
export { name, run }