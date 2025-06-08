import { readFile } from "node:fs/promises";
import { parse } from "ini";

export async function getConfig(path: string) {
    let text = await readFile(path, {
        encoding: "utf-8",
    });

    return parse(text);
}
