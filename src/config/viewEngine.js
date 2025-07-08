import express from "express";
import cors from "cors";

const configViewEngine = (app) => {
    app.use(cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
}

export default configViewEngine;