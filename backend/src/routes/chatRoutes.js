import express from "express";
import { chatHandler } from "../controllers/chatController.js";
import { optionalVerifyToken } from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/", optionalVerifyToken, chatHandler);

export default router;