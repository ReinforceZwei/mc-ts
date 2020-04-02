import * as fs from 'fs';
import * as readline from 'readline';

let defaultLang = 'zh_tw';
enum Lang {
    zh_tw = 'zh_tw'
}
/*
function GetTranslation(lang: Lang = Lang.zh_tw): { a: string, b: string } {
    if(fs.existsSync(lang + '.lang')){
        let lines: string[] = fs.readFileSync(lang + '.lang', { encoding:'utf8'});
    }
}

async function processLineByLine(path: string) {
    let fileStream = fs.createReadStream(path);

    let rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    for await (let line of rl) {
        // Each line in input.txt will be successively available here as `line`.
        console.log(`Line from file: ${line}`);
    }
}
*/