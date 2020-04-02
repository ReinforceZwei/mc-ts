"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const color = require('ansi-color').set;
//const util = require('util')
const util = require("util");
let Translation = require('../lang/zh_tw.json');
let oldColorCodeReg = /§[0-f,k-o,r]/gm;
var Colors;
(function (Colors) {
    Colors["black"] = "black+white_bg";
    Colors["dark_blue"] = "blue";
    Colors["dark_green"] = "green";
    Colors["dark_aqua"] = "cyan";
    Colors["dark_red"] = "red";
    Colors["dark_purple"] = "magenta";
    Colors["gold"] = "yellow";
    Colors["gray"] = "black+white_bg";
    Colors["dark_gray"] = "black+white_bg";
    Colors["blue"] = "blue";
    Colors["green"] = "green";
    Colors["aqua"] = "cyan";
    Colors["red"] = "red";
    Colors["light_purple"] = "magenta";
    Colors["yellow"] = "yellow";
    Colors["white"] = "white";
    Colors["reset"] = "white+black_bg";
})(Colors || (Colors = {}));
var Styles;
(function (Styles) {
    Styles["obfuscated"] = "blink";
    Styles["bold"] = "bold";
    Styles["strikethrough"] = "";
    Styles["underlined"] = "underlined";
    Styles["italic"] = "";
})(Styles || (Styles = {}));
function ParseChat(chat, parentStyle) {
    let colors = new Array(); // color stack, clear on new style
    let style = new Array(); // style stack, clear on new style
    let text = new Array(); // will store with color code
    if (chat.bold)
        style.push(Styles.bold);
    if (chat.italic)
        style.push(Styles.italic);
    if (chat.underlined)
        style.push(Styles.underlined);
    if (chat.strikethrough)
        style.push(Styles.strikethrough);
    if (chat.obfuscated)
        style.push(Styles.obfuscated);
    if (chat.color)
        style.push(Colors[chat.color]);
    if (parentStyle && (parentStyle.colors.length > 0 || parentStyle.style.length > 0)) {
        colors = colors.concat(parentStyle.colors);
        style = style.concat(parentStyle.style);
    }
    if (colors.length > 1)
        colors.shift();
    if (style.length > 1)
        style.shift();
    if (chat.text) {
        // handle § color
        if (chat.text.match(oldColorCodeReg)) {
            let txtpart = chat.text.split(oldColorCodeReg);
            let colorCode = chat.text.match(oldColorCodeReg);
            let tmp = new Array();
            tmp.push(txtpart[0]);
            colorCode.forEach((e, i) => {
                e = e.slice(1);
                let tmpColor;
                switch (e) {
                    case '0':
                        tmpColor = Colors.black;
                        break;
                    case '1':
                        tmpColor = Colors.dark_blue;
                        break;
                    case '2':
                        tmpColor = Colors.dark_green;
                        break;
                    case '3':
                        tmpColor = Colors.dark_aqua;
                        break;
                    case '4':
                        tmpColor = Colors.dark_red;
                        break;
                    case '5':
                        tmpColor = Colors.dark_purple;
                        break;
                    case '6':
                        tmpColor = Colors.gold;
                        break;
                    case '7':
                        tmpColor = Colors.gray;
                        break;
                    case '8':
                        tmpColor = Colors.dark_gray;
                        break;
                    case '9':
                        tmpColor = Colors.blue;
                        break;
                    case 'a':
                        tmpColor = Colors.green;
                        break;
                    case 'b':
                        tmpColor = Colors.aqua;
                        break;
                    case 'c':
                        tmpColor = Colors.red;
                        break;
                    case 'd':
                        tmpColor = Colors.light_purple;
                        break;
                    case 'e':
                        tmpColor = Colors.yellow;
                        break;
                    case 'f':
                        tmpColor = Colors.white;
                        break;
                    case 'r':
                        tmpColor = Colors.reset;
                        break;
                }
                tmp.push(color(txtpart[i + 1].trim(), tmpColor));
            });
            if (tmp[0] == '')
                tmp.shift();
            text.push(tmp.join(' '));
        }
        else {
            text.push(color(chat.text.trim(), colors.concat(style).join('+')));
        }
    }
    if (chat.translate) {
        if (chat.with) {
            let args = new Array();
            if (colors.length > 0 || style.length > 0) {
                chat.with.forEach(e => {
                    args.push(ParseChat(e, { colors, style }));
                });
            }
            else {
                chat.with.forEach(e => {
                    args.push(ParseChat(e));
                });
            }
            text.push(util.format(Translation[chat.translate].replace(/%\d\$s/gm, '%s'), ...args));
        }
        else {
            return color(Translation[chat.translate].replace(/%\d\$s/gm, '%s'), colors.concat(style).join('+'));
        }
    }
    if (chat.extra) {
        if (colors.length > 0 || style.length > 0) {
            chat.extra.forEach(e => {
                text.push(ParseChat(e, { colors, style }));
            });
        }
        else {
            chat.extra.forEach(e => {
                text.push(ParseChat(e));
            });
        }
    }
    return text.join(' ');
}
exports.default = ParseChat;
//# sourceMappingURL=ChatParser.js.map