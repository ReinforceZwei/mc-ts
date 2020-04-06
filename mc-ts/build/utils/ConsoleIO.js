"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Keys {
}
Keys.ctrlC = '\u0003';
Keys.enter = '\u000d';
Keys.backward = '\b';
Keys.tab = '\t';
Keys.delete = '\u001b[3~';
Keys.home = '\u001b[1~';
Keys.end = '\u001b[4~';
Keys.arrowUp = '\u001B\u005B\u0041';
Keys.arrowDown = '\u001B\u005B\u0042';
Keys.arrowLeft = '\u001B\u005B\u0044';
Keys.arrowRight = '\u001B\u005B\u0043';
exports.Keys = Keys;
class ConsoleIO {
    constructor(prefix = '>') {
        this.stdin = process.stdin;
        ConsoleIO.prefix = prefix;
        this.openStdin();
        ConsoleIO.inited = true;
        ConsoleIO.writeRaw(ConsoleIO.prefix);
    }
    openStdin() {
        this.stdin.setRawMode(true);
        this.stdin.resume();
        this.stdin.setEncoding('utf8');
        this.stdin.on("data", (b) => {
            let key = b.toString();
            switch (key) {
                case Keys.ctrlC:
                    process.exit();
                    break;
                case Keys.enter:
                    ConsoleIO.writeRaw('\n');
                    let tmp = ConsoleIO.buffer + ConsoleIO.buffer2;
                    ConsoleIO.buffer = '';
                    ConsoleIO.buffer2 = '';
                    ConsoleIO.index = 0;
                    this.callback(tmp);
                    break;
                case Keys.backward:
                    if (ConsoleIO.buffer.length > 0) {
                        ConsoleIO.writeRaw('\b \b');
                        ConsoleIO.buffer = ConsoleIO.buffer.slice(0, -1);
                        ConsoleIO.index--;
                    }
                    break;
                case Keys.arrowLeft: // <-
                    this.goLeft();
                    break;
                case Keys.arrowRight: // ->
                    this.goRight();
                    break;
                case Keys.end:
                    while (ConsoleIO.buffer2.length > 0)
                        this.goRight();
                    break;
                case Keys.home:
                    while (ConsoleIO.buffer.length > 0)
                        this.goLeft();
                    break;
                default:
                    if (key.charCodeAt(0) >= 32 && key.charCodeAt(0) <= 126) {
                        // normal char, write to buffer
                        ConsoleIO.buffer += key;
                        ConsoleIO.index++;
                        ConsoleIO.writeRaw(key + ConsoleIO.buffer2);
                    }
            }
        });
    }
    /*
    writeln(msg){
        ConsoleIO.writeRaw("\r\x1b[K");
        ConsoleIO.writeRaw(msg+'\n');
        ConsoleIO.writeRaw(this.prefix);
        ConsoleIO.writeRaw(this.buffer+this.buffer2);
        let loops = (this.buffer.length+this.buffer2.length) - this.index;
        for(let i = 0; i < loops; i++){
            ConsoleIO.writeRaw(Keys.arrowLeft);
        }
    }
    */
    static writeln(msg, ...args) {
        if (args.length > 0)
            msg += ', ' + args.join(', ');
        if (ConsoleIO.inited) {
            ConsoleIO.writeRaw("\r\x1b[K");
            ConsoleIO.writeRaw(msg + '\n');
            ConsoleIO.writeRaw(this.prefix);
            ConsoleIO.writeRaw(this.buffer + this.buffer2);
            let loops = (this.buffer.length + this.buffer2.length) - this.index;
            for (let i = 0; i < loops; i++) {
                ConsoleIO.writeRaw(Keys.arrowLeft);
            }
        }
        else {
            ConsoleIO.writeRaw(msg + '\n');
        }
    }
    static writeRaw(msg, ...args) {
        if (args.length > 0)
            msg += ', ' + args.join(', ');
        process.stdout.write(msg);
    }
    OnLine(cb) {
        this.callback = cb;
    }
    goLeft() {
        if (ConsoleIO.index > 0) {
            ConsoleIO.index--;
            ConsoleIO.buffer2 = ConsoleIO.buffer[ConsoleIO.buffer.length - 1] + ConsoleIO.buffer2;
            ConsoleIO.buffer = ConsoleIO.buffer.substring(0, ConsoleIO.buffer.length - 1);
            ConsoleIO.writeRaw(Keys.arrowLeft + ConsoleIO.buffer2);
        }
    }
    goRight() {
        if (ConsoleIO.index < (ConsoleIO.buffer.length + ConsoleIO.buffer2.length)) {
            ConsoleIO.index++;
            ConsoleIO.buffer += ConsoleIO.buffer2[0];
            ConsoleIO.buffer2 = ConsoleIO.buffer2.substring(1);
            ConsoleIO.writeRaw(Keys.arrowRight + ConsoleIO.buffer2);
        }
    }
    static getKeyCode(key) {
        let codes = [];
        for (let i = 0; i < key.length; i++) {
            codes.push(key.charCodeAt(i));
        }
        return codes;
    }
}
ConsoleIO.inited = false;
ConsoleIO.buffer = '';
ConsoleIO.buffer2 = '';
ConsoleIO.index = 0;
ConsoleIO.history = new Array();
ConsoleIO.historyIndex = 0;
exports.default = ConsoleIO;
//# sourceMappingURL=ConsoleIO.js.map