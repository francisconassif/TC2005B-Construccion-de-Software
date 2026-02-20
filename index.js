import express from "express";
import fs from "fs";

const app = express();

app.use(express.static("public"));

app.get("/imges", (req, res) => {
    const images = fs.readdirSync("public/assets");
    res.json(images);
});

app.listen(8080, console.log("localhost:8080"));
// localhost
// 127.0.0.1