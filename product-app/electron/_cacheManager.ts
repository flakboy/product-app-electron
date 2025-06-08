import { Database, open } from "sqlite";
import sqlite3 from "sqlite3";

// import { fileURLToPath } from "node:url";
// __filename =
//     typeof __filename == "undefined"
//         ? fileURLToPath(import.meta.url)
//         : __filename;

export class SqliteCacheManager {
    dbPath: string;
    db: Database | null = null;

    constructor(path: string) {
        this.dbPath = path;
    }

    async init() {
        this.db = await open({
            // filename: this.dbPath,
            filename: "C:\\Users\\kamaz\\.product-app",
            driver: sqlite3.Database,
        });
        // this.db = new sqlite3.Database(this.dbPath);
    }
}
