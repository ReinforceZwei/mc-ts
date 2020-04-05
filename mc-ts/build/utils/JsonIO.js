"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class JsonIO {
    /**
     * read a .json file to json object
     * @param path the path to the .json file
     */
    static read(path) {
        if (fs.existsSync(path) && path.slice().toLowerCase().endsWith('.json')) {
            let buffer = fs.readFileSync(path, { encoding: 'utf8' });
            let json;
            try {
                json = JSON.parse(buffer);
            }
            catch (e) {
                return false;
            }
            return json;
        }
    }
    /**
     * Write a object to a .json file
     * @param json the object to write
     * @param path the file path
     */
    static write(json, path) {
        if (path.slice().toLowerCase().endsWith('.json')) {
            json = JSON.stringify(json, null, 4);
            fs.writeFileSync(path, json);
            return true;
        }
        else {
            return false;
        }
    }
}
exports.default = JsonIO;
//# sourceMappingURL=JsonIO.js.map