import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import {protect,} from "../middleware/authMiddleware.js";
import {authorizeRoles} from "../middleware/roleMiddleware.js";
import {
  createReport,
  getMyReports,
  getAllReports,
  uploadImage,
  getAvailableReports,
  acceptReport,
  markCollected,
  getMyReportCount,
  getAssignedReports
} from "../controllers/reportController.js";



const router = express.Router();
router.post(
  "/",
  protect,
  upload.single("image"),
  createReport
);

router.get("/my", protect, getMyReports);
router.get(
  "/my/count",
  protect,
  getMyReportCount
);
router.get("/all",getAllReports);
router.post(
  "/upload",
  protect,
  upload.single("image"),
  uploadImage
);
router.get(
  "/available",
  protect,
  authorizeRoles("collector"),
  getAvailableReports
);

router.put(
  "/:id/accept",
  protect,
  authorizeRoles("collector"),
  acceptReport
);

router.put(
  "/:id/collect",
  protect,
  authorizeRoles("collector"),
  markCollected
);
router.get(
  "/assigned",
  protect,
  authorizeRoles("collector"),
  getAssignedReports
);

export default router;