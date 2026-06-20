import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  registerUser,
  loginUser,
  getMe
} from "../controllers/authController.js";
import { getLeaderboard ,getMyRewards} from "../controllers/reportController.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.get(
  "/leaderboard",
  getLeaderboard
);

router.get(
  "/rewards",
  protect,
  getMyRewards
);

export default router;