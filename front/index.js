import express from "express";
import fs from "fs";
import expressStaticGzip from "express-static-gzip";

const app = express();

app.use("/", expressStaticGzip("public", {
    enableBrotli: true,
    orderPreference: ['br', 'gz']
}));

app.get("/imges", (req, res) => {
    const images = fs.readdirSync("public/assets");
    res.json(images);
});

app.listen(8080, () => console.log("Servidor rodando em http://localhost:8080"));