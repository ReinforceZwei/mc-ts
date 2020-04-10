import Client from '../Client';
import * as console from '../utils/ConsoleIO2';
let name = 'slot';
function run(args: string[], client: Client) {
    if (args.length == 1) {
        let slot = Number.parseInt(args[0]);
        if (slot >= 1 && slot <= 9) {
            client.ChangeSlot(slot - 1);
            console.log("Changed to *" + slot);
            return;
        }
    }
    console.log("Missing or incorrect slotID (Must be 1-9)");
}
export { name, run }