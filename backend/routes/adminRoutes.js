import express from "express";

import { protect }
from "../middleware/authMiddleware.js";

import {
  authorizeRoles
}
from "../middleware/roleMiddleware.js";

import {
  getAdminStats
}
from "../controllers/adminController.js";
import {
  generatePDFReport
}
from "../controllers/adminController.js";

const router =
  express.Router();

router.get(
  "/stats",
  protect,
  authorizeRoles("admin"),
  getAdminStats
);
router.get(
  "/report/pdf",
  protect,
  authorizeRoles("admin"),
  generatePDFReport
);

export default router;