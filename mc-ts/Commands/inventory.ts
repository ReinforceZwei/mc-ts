import Client from '../Client';
import { ItemType } from '../DataTypes';
import * as console from '../utils/ConsoleIO2';
let name = 'inventory';
function run(args: string[], client: Client) {
    let output: string[] = [];
    output.push("[*] is hotbar");
    output.push("[#] is inventory");
    client.inventory.Items.forEach((item, slot) => {
        let _slot: number = slot;
        if (slot >= 36 && slot <= 44) {
            _slot -= 35;
            output.push("*" + _slot + " Type: " + ItemType[item.Type] + ", Count: " + item.Count);
        } else {
            output.push("#" + slot + " Type: " + ItemType[item.Type] + ", Count: " + item.Count);
        }
    });
    output.push("Your selected Hotbar is *" + (client.currentSlot + 1));
    console.log(output.join('\n'));
}
export { name, run }