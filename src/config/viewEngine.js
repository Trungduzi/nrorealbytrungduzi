import express from "express";
import cors from "cors";

const allowedOrigins = [
    "http://localhost:5173",
    "https://nrorealbytrungduzi-production.up.railway.app"
];

const configViewEngine = (app) => {
    app.use(cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
};

export default configViewEngine;
