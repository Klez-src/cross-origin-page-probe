import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const probe = express();
const target = express();

probe.use(express.static(path.join(__dirname, "public")));

probe.listen(3000, () => {
    console.log("probe  -> http://localhost:3000");
});

target.use(express.static(path.join(__dirname, "target")));

target.listen(3001, () => {
    console.log("target -> http://localhost:3001");
});
