import cors from "cors";
import express from "express";

const configViewEngine = (app) => {
    app.use(cors({
        origin: "*", // Hoặc đổi thành 'http://localhost:5173' nếu muốn giới hạn domain
        methods: ["GET", "POST"],
        credentials: true,
    }));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
};

export default configViewEngine;
