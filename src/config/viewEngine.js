// src/config/viewEngine.js
import express from "express";
import cors from "cors";

const configViewEngine = (app) => {
    app.use(cors({
        origin: "*", // hoặc 'http://localhost:5173' nếu bạn muốn chặt hơn
        methods: ["GET", "POST"],
        credentials: true
    }));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
};

export default configViewEngine;
