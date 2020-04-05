import * as fs from 'fs';
export default class JsonIO {
    /**
     * read a .json file to json object
     * @param path the path to the .json file
     */
    static read(path: string): any {
        if (fs.existsSync(path) && path.slice().toLowerCase().endsWith('.json')) {
            let buffer = fs.readFileSync(path, {encoding: 'utf8'});
            let json: any;
            try {
                json = JSON.parse(buffer);
            } catch (e) {
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
    static write(json: any, path: string): boolean {
        if (path.slice().toLowerCase().endsWith('.json')) {
            json = JSON.stringify(json, null, 4);
            fs.writeFileSync(path, json);
            return true;
        } else {
            return false;
        }
    }
}