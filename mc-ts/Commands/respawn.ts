import Client from '../Client';
import * as console from '../utils/ConsoleIO2';
let name = 'respawn';
function run(args: string[], client: Client) {
    client.Respawn();
    console.log('You have been respawned.');
}
export { name, run }