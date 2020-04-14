"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bots = require("./Bots");
let client;
let bots = new Array();
function SetHandler(_client) {
    client = _client;
    LoadBot(new Bots.AutoFish());
    LoadBot(new Bots.AutoAttack());
    LoadBot(new Bots.AutoEat());
    // Load more bot here
    //LoadBot(new Bots.MyBot());
    InitializeBots();
    client.bots = bots;
}
exports.SetHandler = SetHandler;
function LoadBot(b) {
    bots.push(b);
}
function UnLoadAllBot() {
    bots = [];
}
exports.UnLoadAllBot = UnLoadAllBot;
function InitializeBots() {
    bots.forEach(e => {
        e.SetHandler(client);
        e.Initialize();
    });
}
//# sourceMappingURL=BotHandler.js.map