// ANSI color code outputs for strings

var ANSI_CODES = {
    "off": 0,
    "bold": 1,
    "italic": 3,
    "underline": 4,
    "blink": 5,
    "inverse": 7,
    "hidden": 8,
    // colors
    "gray": 90,
    "red": 91,
    "green": 92,
    "yellow": 93,
    "blue": 94,
    "magenta": 95,
    "cyan": 96,
    "black": 30,
    "dark_red": 31,
    "dark_aqua": 32,
    "dark_green": 33,
    "dark_blue": 34,
    "dark_purple": 35,
    "white": 37,
    // gackgrounds
    "black_bg": 40,
    "red_bg": 41,
    "green_bg": 42,
    "yellow_bg": 43,
    "blue_bg": 44,
    "magenta_bg": 45,
    "cyan_bg": 46,
    "white_bg": 47
};

export default function color(str: string, color: string): string {
    if (!color) return str;

    var color_attrs = color.split("+");
    var ansi_str = "";
    for (var i = 0, attr; attr = color_attrs[i]; i++) {
        ansi_str += "\u001b[" + ANSI_CODES[attr] + "m";
    }
    ansi_str += str + "\u001b[" + ANSI_CODES["off"] + "m";
    return ansi_str;
};