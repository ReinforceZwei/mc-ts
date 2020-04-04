import Client from '../Client';
import { Location } from '../DataTypes';
let name = 'useitem';
function run(args: string[], client: Client) {
    client.UseItem();
    console.log('Use an item');
}
export { name, run }