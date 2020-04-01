"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
/**
 * Get all files in the path that ends with extensions
 * @param path - Dir to read
 * @param extensions - Default is .ts
 * @returns Array of files
 */
function GetDirFiles(path, extensions = '.ts') {
    let files = fs.readdirSync(path).filter(file => file.endsWith(extensions));
    return files;
}
exports.default = GetDirFiles;
//# sourceMappingURL=GetDirFiles.js.map