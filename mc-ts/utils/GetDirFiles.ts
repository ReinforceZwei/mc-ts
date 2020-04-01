import * as fs from "fs";
/**
 * Get all files in the path that ends with extensions
 * @param path - Dir to read
 * @param extensions - Default is .ts
 * @returns Array of files
 */
export default function GetDirFiles(path: string, extensions: string = '.ts') : string[] {
    let files: string[] = fs.readdirSync(path).filter(file => file.endsWith(extensions));
    return files;
}