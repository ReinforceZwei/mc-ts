import Client from '../Client';
let name = 'respawn';
function run(args: string[], client: Client) {
    client.Respawn();
    console.log('You have been respawned.');
}
export { name, run }