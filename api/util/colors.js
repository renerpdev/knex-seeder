const suffix = "\x1b[0m", preffix = "\x1b[";

const colors = {
    Reset: preffix + "0m",
    Bright: preffix + "1m",
    Dim: preffix + "2m",
    Underscore: preffix + "4m",
    Blink: preffix + "5m",
    Reverse: preffix + "7m",
    Hidden: preffix + "8m",

    FgBlack: preffix + "30m",
    FgRed: preffix + "31m",
    FgGreen: preffix + "32m",
    FgYellow: preffix + "33m",
    FgBlue: preffix + "34m",
    FgMagenta: preffix + "35m",
    FgCyan: preffix + "36m",
    FgWhite: preffix + "37m",

    BgBlack: preffix + "40m",
    BgRed: preffix + "41m",
    BgGreen: preffix + "42m",
    BgYellow: preffix + "43m",
    BgBlue: preffix + "44m",
    BgMagenta: preffix + "45m",
    BgCyan: preffix + "46m",
    BgWhite: preffix + "47m",
    BgGrey: preffix + "100m",

    ShineGrey: preffix + "90m",
    ShineRed: preffix + "91m",
    ShineGreen: preffix + "92m",
    ShineYellow: preffix + "93m",
    ShineBlue: preffix + "94m",
    ShineMagenta: preffix + "95m",
    ShineCyan: preffix + "96m",
    ShineWhite: preffix + "97m",

    BgGrey: preffix + "100m",

    ShineBgRed: preffix + "101m",
    ShineBgGreen: preffix + "102m",
    ShineBgYellow: preffix + "103m",
    ShineBgBlue: preffix + "104m",
    ShineBgMagenta: preffix + "105m",
    ShineBgCyan: preffix + "106m",
    ShineBgWhite: preffix + "107m",

}

module.exports = { colors, suffix };