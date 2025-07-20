import express from "express";
import homeController from "../controllers/homeController.js";

const router = express.Router();


router.post('/api/create-user', homeController.createUser);
router.get('/api/get-user', homeController.getAllUser);
router.post('/api/login', homeController.login);
router.post("/api/admin/create-card", homeController.createCard);
router.post("/api/nap-card", homeController.napCard);
router.post("/api/get-history", homeController.getHistory);
router.get("/api/get-historycard", homeController.getHistoryCard);

export default router;