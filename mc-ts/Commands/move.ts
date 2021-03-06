﻿import Client from '../Client';
import { Location } from '../DataTypes';
import * as console from '../utils/ConsoleIO2';
let name = 'move';
function run(args: string[], client: Client) {
    let location: Location = client.playerLocation;
    location.X += 1;
    client.Move(location);
    console.log('Moved');
}
export { name, run }