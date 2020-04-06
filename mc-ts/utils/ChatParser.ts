import color from './AnsiColor';
import * as util from 'util';
let Translation = require('../lang/zh_tw.json');

let oldColorCodeReg = /§[0-f,k-o,r]/gm;

interface ChatObject {
    bold?: boolean,
    italic?: boolean,
    underlined?: boolean,
    strikethrough?: boolean,
    obfuscated?: boolean,
    color?: Colors,
    text?: string,
    translate?: string,
    with?: Array<ChatObject>,
    insertion?: string,
    clickEvent?: clickEvent,
    hoverEvent?: hoverEvent,
    extra?: Array<ChatObject>
}
interface clickEvent {
    open_url?: string,
    run_command?: string,
    suggest_command?: string,
    change_page?: string
}
interface hoverEvent {
    show_text?: string,
    show_item?: string,
    show_entity?: string
}
enum Colors {
    black = 'black+white_bg',
    dark_blue = 'dark_blue',
    dark_green = 'dark_green',
    dark_aqua = 'dark_aqua',
    dark_red = 'dark_red',
    dark_purple = 'dark_purple',
    gold = 'yellow',
    gray = 'gray',
    dark_gray = 'gray',
    blue = 'blue',
    green = 'green',
    aqua = 'cyan',
    red = 'red',
    light_purple = 'magenta',
    yellow = 'yellow',
    white = 'white',
    reset = 'white+black_bg'
}
enum Styles {
    obfuscated = 'blink',
    bold = 'bold',
    strikethrough = '',
    underlined = 'underlined',
    italic = ''
}

export default function ParseChat(chat: ChatObject, parentStyle?: { colors?:Array<string>, style?:Array<string>}) {
    let colors: Array<string> = new Array<string>(); // color stack, clear on new style
    let style: Array<string> = new Array<string>(); // style stack, clear on new style
    let text: Array<string> = new Array<string>(); // will store with color code

    if (parentStyle && (parentStyle.colors.length > 0 || parentStyle.style.length > 0)) {
        colors = colors.concat(parentStyle.colors);
        style = style.concat(parentStyle.style);
    }

    if (chat.bold) style.push(Styles.bold);
    if (chat.italic) style.push(Styles.italic);
    if (chat.underlined) style.push(Styles.underlined);
    if (chat.strikethrough) style.push(Styles.strikethrough);
    if (chat.obfuscated) style.push(Styles.obfuscated);
    if (chat.color) colors.push(Colors[chat.color]);
    
    if (colors.length > 1) colors.shift();
    //if (style.length > 1) style.shift();
    if (chat.text) {
        // handle § color
        if (chat.text.match(oldColorCodeReg)) {
            let txtpart = chat.text.split(oldColorCodeReg);
            let colorCode = chat.text.match(oldColorCodeReg);
            let tmp = new Array<string>();
            tmp.push(txtpart[0]);
            colorCode.forEach((e, i) => {
                e = e.slice(1);
                let tmpColor: string;
                switch (e) {
                    case '0': tmpColor = Colors.black; break;
                    case '1': tmpColor = Colors.dark_blue; break;
                    case '2': tmpColor = Colors.dark_green; break;
                    case '3': tmpColor = Colors.dark_aqua; break;
                    case '4': tmpColor = Colors.dark_red; break;
                    case '5': tmpColor = Colors.dark_purple; break;
                    case '6': tmpColor = Colors.gold; break;
                    case '7': tmpColor = Colors.gray; break;
                    case '8': tmpColor = Colors.dark_gray; break;
                    case '9': tmpColor = Colors.blue; break;
                    case 'a': tmpColor = Colors.green; break;
                    case 'b': tmpColor = Colors.aqua; break;
                    case 'c': tmpColor = Colors.red; break;
                    case 'd': tmpColor = Colors.light_purple; break;
                    case 'e': tmpColor = Colors.yellow; break;
                    case 'f': tmpColor = Colors.white; break;
                    case 'r': tmpColor = Colors.reset; break;
                }
                tmp.push(color(txtpart[i + 1].trim(), tmpColor));
            });
            if (tmp[0] == '') tmp.shift();
            text.push(tmp.join(' '));
        } else {
            text.push(color(chat.text.trim(), colors.concat(style).join('+')));
        }
    }
    if (chat.translate) {
        let translatedText = Translation[chat.translate].replace(/%\d\$s/gm, '%s');
        if (chat.with) {
            let args: Array<string> = new Array<string>();
            chat.with.forEach(e => {
                args.push(ParseChat(e));
            });
            text.push(color(util.format(translatedText, ...args), colors.concat(style).join('+')));
        } else {
            text.push(color(translatedText, colors.concat(style).join('+')));
        }
    }
    if (chat.extra) {
        chat.extra.forEach(e => {
            text.push(ParseChat(e, { colors, style }));
        });
    }
    return text.join(' ');
}
