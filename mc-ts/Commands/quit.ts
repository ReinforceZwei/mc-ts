import Client from '../Client';
let name = 'quit';
function run(args: string[], client: Client) {
    client.c.end('');
}
export { name, run }