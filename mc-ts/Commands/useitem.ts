import Client from '../Client';
import { Location } from '../DataTypes';
import * as console from '../utils/ConsoleIO2';
let name = 'useitem';
function run(args: string[], client: Client) {
    client.UseItem();
    console.log('Use an item');
}
export { name, run }