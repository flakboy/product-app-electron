import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { getConfig } from "./config";
import path from "node:path";

const config = await getConfig("config.ini");
if (!config.cache_directory) {
    throw new Error(
        "Missing value for cache_directory. Check config.ini file."
    );
}

const cache_path = path.join(config.cache_directory, "cache.db");

export const db = await open({
    filename: cache_path,
    driver: sqlite3.Database,
});
