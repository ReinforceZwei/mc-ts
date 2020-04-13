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
    'ctrlV': '\u0016',
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
let chinese = /[\u3007u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF\u20000-\u2A6DF\u2A700-\u2B73F\u2B740-\u2B81F\u0002F800-\u2FA1F\u2F00-\u2FD5\u2E80-\u2EF3\uFF02\uFF03\uFF04\uFF05\uFF06\uFF07\uFF08\uFF09\uFF0A\uFF0B\uFF0C\uFF0D\uFF0F\uFF1A\uFF1B\uFF1C\uFF1D\uFF1E\uFF20\uFF3B\uFF3C\uFF3D\uFF3E\uFF3F\uFF40\uFF5B\uFF5C\uFF5D\uFF5E\uFF5F\uFF60\uFF62\uFF63\uFF64\u3000\u3001\u3003\u3008\u3009\u300A\u300B\u300C\u300D\u300E\u300F\u3010\u3011\u3014\u3015\u3016\u3017\u3018\u3019\u301A\u301B\u301C\u301D\u301E\u301F\u3030\u303E\u303F\u2013\u2014\u2018\u2019\u201B\u201C\u201D\u201E\u201F\u2026\u2027\uFE4F\uFE51\uFE54\u00B7\uFF01\uFF1F\uFF61\u3002」﹂”』’》）］｝〕〗〙〛〉】]/gm;
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
            writeRaw("\r\x1b[K");
            writeRaw(prefix);
            if (history[history.length - 1] != tmp && tmp != '') {
                history.push(tmp);
            }
            historyIndex = history.length;
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
        case Keys.delete:
            if (buffer2.length > 0) {
                buffer2 = buffer2.substr(1);
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
            if ((key.charCodeAt() >= 32 && key.charCodeAt() <= 126) || (key.match(chinese))) {
                for (let i = 0; i < key.length; i++) {
                    // normal char, write to buffer
                    buffer += key[i];
                    index++;
                    writeRaw(key[i] + buffer2);
                    setCursor();
                }
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
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');
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