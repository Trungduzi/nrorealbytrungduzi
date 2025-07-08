import express from "express";
import configViewEngine from './config/viewEngine.js';
import router from './routers/web.js';
import dotenv from "dotenv";
dotenv.config();

const app = express();

configViewEngine(app);
app.use(router);

const port = process.env.PORT;

app.listen(port, () => {
    console.log("Máy chủ đang chạy trên http://localhost:" + port);
})