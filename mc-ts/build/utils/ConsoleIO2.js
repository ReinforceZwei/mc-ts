"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let stdin = process.stdin;
let buffer = '';
let buffer2 = '';
let index = 0;
let prefix = '>';
let cb;
let history = [];
let historyIndex = 0;
let Keys = {
    'ctrlC': '\u0003',
    'enter': '\u000d',
    'backward': '\b',
    'tab': '\t',
    'delete': '\u001b[3~',
    'home': '\u001b[1~',
    'end': '\u001b[4~',
    'arrowUp': '\u001B\u005B\u0041',
    'arrowDown': '\u001B\u005B\u0042',
    'arrowLeft': '\u001B\u005B\u0044',
    'arrowRight': '\u001B\u005B\u0043',
    'esc': '\u001b'
};
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');
stdin.on("data", (key) => {
    switch (key) {
        case Keys.ctrlC:
            process.exit();
            break;
        case Keys.enter:
            writeRaw('\n');
            let tmp = buffer + buffer2;
            buffer = '';
            buffer2 = '';
            index = 0;
            cb(tmp);
            if (tmp == '')
                writeRaw(prefix);
            if (history[history.length - 1] != tmp && tmp != '') {
                history.push(tmp);
                historyIndex = history.length;
            }
            break;
        case Keys.backward:
            if (buffer.length > 0) {
                writeRaw('\b \b');
                buffer = buffer.slice(0, -1);
                index--;
                writeRaw("\r\x1b[K");
                writeRaw(prefix);
                writeRaw(buffer + buffer2);
                setCursor();
            }
            break;
        case Keys.arrowLeft: // <-
            if (index > 0)
                goLeft();
            break;
        case Keys.arrowRight: // ->
            if (index < (buffer.length + buffer2.length))
                goRight();
            break;
        case Keys.home: // <<-
            while (index > 0)
                goLeft();
            break;
        case Keys.end: // ->>
            while (index < (buffer.length + buffer2.length))
                goRight();
            break;
        case Keys.arrowUp:
            if (history.length > 0) {
                if ((historyIndex) > 0) {
                    historyIndex--;
                    writeRaw("\r\x1b[K");
                    writeRaw(prefix);
                    writeRaw(history[historyIndex]);
                    buffer = history[historyIndex];
                    index = buffer.length;
                }
            }
            break;
        case Keys.arrowDown:
            if (history.length > 0) {
                historyIndex++;
                if ((historyIndex) < history.length) {
                    writeRaw("\r\x1b[K");
                    writeRaw(prefix);
                    writeRaw(history[historyIndex]);
                    buffer = history[historyIndex];
                    index = buffer.length;
                }
                else {
                    buffer = '';
                    buffer2 = '';
                    index = 0;
                    writeRaw("\r\x1b[K");
                    writeRaw(prefix);
                    historyIndex = history.length;
                }
            }
            break;
        case Keys.esc:
            buffer = '';
            buffer2 = '';
            index = 0;
            writeRaw("\r\x1b[K");
            writeRaw(prefix);
            historyIndex = history.length;
            break;
        default:
            if (key.charCodeAt() >= 32 && key.charCodeAt() <= 126) {
                // normal char, write to buffer
                buffer += key;
                index++;
                writeRaw(key + buffer2);
                setCursor();
            }
    }
});
function writeln(msg) {
    writeRaw("\r\x1b[K");
    //writeRaw(msg + '\n');
    console.log(msg);
    writeRaw(prefix);
    writeRaw(buffer + buffer2);
    setCursor();
}
exports.writeln = writeln;
function log(msg, ...args) {
    if (args.length > 0)
        msg += ', ' + args.join(', ');
    writeln(msg);
}
exports.log = log;
function writeRaw(msg) {
    process.stdout.write(msg);
}
function OnLine(callback) {
    cb = callback;
}
exports.OnLine = OnLine;
function goLeft() {
    if (index > 0) {
        index--;
        buffer2 = buffer[buffer.length - 1] + buffer2;
        buffer = buffer.substring(0, buffer.length - 1);
        writeRaw(Keys.arrowLeft);
    }
}
function goRight() {
    if (index < (buffer.length + buffer2.length)) {
        index++;
        buffer += buffer2[0];
        buffer2 = buffer2.substring(1);
        writeRaw(Keys.arrowRight);
    }
}
function setCursor() {
    let loops = (buffer.length + buffer2.length) - index;
    for (let i = 0; i < loops; i++) {
        writeRaw(Keys.arrowLeft);
    }
}
function setPrefix(_prefix = '>') {
    prefix = _prefix;
}
exports.setPrefix = setPrefix;
function start() {
    writeRaw(prefix);
}
exports.start = start;
/*
setInterval(()=>{
    writeln('This is a ww w mwsg');
},5000);
*/
function getKeyCode(key) {
    let codes = [];
    for (let i = 0; i < key.length; i++) {
        codes.push(key.charCodeAt(i));
    }
    return codes;
}
//# sourceMappingURL=ConsoleIO2.js.map