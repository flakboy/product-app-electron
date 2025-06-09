import express, { Request, Response } from "express";
import { createDesktopAppRouter } from "./routes/desktop-app";

const app = express();
const PORT = process.env.PORT || 4000;

app.use("/api/desktop", createDesktopAppRouter());

app.listen(PORT, () => {
    console.log("Listening on port", PORT);
});
