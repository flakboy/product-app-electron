import { app, BrowserWindow } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";

// import { createRequire } from "node:module";
// const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, "..");

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
    ? path.join(process.env.APP_ROOT, "public")
    : RENDERER_DIST;

let window: BrowserWindow | null;

function createWindow() {
    window = new BrowserWindow({
        icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
        webPreferences: {
            preload: path.join(__dirname, "preload.mjs"),
        },
        // titleBarStyle: "hidden",
    });

    // Test active push message to Renderer-process.
    window.webContents.on("did-finish-load", () => {
        window?.webContents.send(
            "main-process-message",
            new Date().toLocaleString()
        );
    });

    if (VITE_DEV_SERVER_URL) {
        window.loadURL(VITE_DEV_SERVER_URL);
    } else {
        // win.loadFile('dist/index.html')
        window.loadFile(path.join(RENDERER_DIST, "index.html"));
    }
}

app.setName("product-app-ztp");

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
        window = null;
    }
});

app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

(async () => {
    // const config = await getConfig("config.ini");
    // if (!config.cache_directory) {
    //     throw new Error(
    //         "Missing value for cache_directory. Check config.ini file."
    //     );
    // }

    // const userprofile = process.env["USERPROFILE"];
    // if (!userprofile) {
    //     throw new Error("Failed to get user directory path.");
    // }
    // const cachePath = path.resolve(userprofile, ".product-app\\cache.db");
    // var dir = path.dirname(cachePath);
    // if (!existsSync(dir)) {
    //     mkdirSync(dir, { recursive: true });
    // }
    // const cacheManager = new SqliteCacheManager(cachePath);

    app.whenReady().then(async () => {
        createWindow();
    });
})();
