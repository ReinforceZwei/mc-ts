import Client from '../Client';
import * as console from '../utils/ConsoleIO2';
let name = 'quit';
function run(args: string[], client: Client) {
    client.c.end('');
    console.log("Quitting...");
    process.exit(0);
}
export { name, run }