import Client from './Client';
import * as Bots from './Bots';
import Bot from './Bot';
let client: Client;
let bots: Array<Bot> = new Array<Bot>();
function SetHandler(_client: Client) {
    client = _client;
    LoadBot(new Bots.AutoFish());
    LoadBot(new Bots.AutoAttack());
    LoadBot(new Bots.AutoEat());
    // Load more bot here
    //LoadBot(new Bots.MyBot());

    InitializeBots();
    client.bots = bots;
}

function LoadBot(b: Bot) {
    bots.push(b);
}

function UnLoadAllBot() {
    bots = [];
}

function InitializeBots() {
    bots.forEach(e => {
        e.SetHandler(client);
        e.Initialize();
    })
}

export { SetHandler, UnLoadAllBot }