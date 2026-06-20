import WasteReport from "../models/wasteReport.js";
import cloudinary from "../config/cloudinary.js";
import Notification from "../models/Notification.js";
import {
  analyzeFoodImage
} from "../services/geminiService.js";
import User from "../models/User.js";
import { getBadge }
from "../utils/rewardUtils.js";
import { io } from "../server.js";
// 1..create report
export const createReport = async (
  req,
  res
) => {
  try {

    const {
      description,
      latitude,
      longitude
    } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "Image is required"
      });
    }

    const base64 =
      req.file.buffer.toString("base64");

      const aiResult =
    await analyzeFoodImage(
    base64,
    req.file.mimetype
  );
console.log("Gemini Response:");
console.log(aiResult);
  let analysis = {};

try {

  analysis = JSON.parse(
    aiResult
      .replace("```json", "")
      .replace("```", "")
      .trim()
  );

} catch {

  analysis = {
    foodType: "Unknown",
    quantity: "Medium",
    edible: false,
    urgency: "Medium",
    confidence: 50
  };

}

    const uploadResult =
      await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${base64}`
      );

 const report =
  await WasteReport.create({

    description,

    imageUrl:
      uploadResult.secure_url,

    aiAnalysis: analysis,

    location: {
      type: "Point",
      coordinates: [
        Number(longitude),
        Number(latitude)
      ]
    },

    reportedBy:
      req.user._id
  });

    res.status(201).json(report);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }
};

// /2..get my reports
export const getMyReports = async (
  req,
  res
) => {
  try {
    const reports =
      await WasteReport.find({
        reportedBy: req.user._id,
      });

    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// 3.get all reports (for admin)
export const getAllReports = async (req, res) => {
  try {

    const reports = await WasteReport
      .find()
      .populate("reportedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(reports);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// 4..upload image

export const uploadImage = async (
  req,
  res
) => {
  try {

    const file =
      req.file.buffer.toString("base64");

    const result =
      await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${file}`
      );

    res.json({
      imageUrl: result.secure_url,
    });

}
// catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
    
//   }
catch (error) {
     console.log(error);
       res.status(500).json({
    message: error.message,
  });
}
};

// 5..get available reports for collectors
export const getAvailableReports =
async (req, res) => {

  const reports =
    await WasteReport.find({
      status: "reported"
    });

  res.json(reports);
};
// 6..accept report (collector)

export const acceptReport =
async (req, res) => {

  const report =
    await WasteReport.findById(
      req.params.id
    );

  if (!report) {
    return res.status(404).json({
      message: "Report not found"
    });
  }

  report.status =
    "accepted";

  report.assignedCollector =
    req.user._id;

  await Notification.create({
    user: report.reportedBy,

    message:
      "Your waste report has been accepted by a collector."
  });

  io.to(
    report.reportedBy.toString()
  ).emit(
    "notification",
    {
      message:
        "Your waste report has been accepted by a collector."
    }
  );

  await report.save();

  res.json(report);
};

// 7..mark as collected (collector)

export const markCollected =
async (req, res) => {

  const report =
    await WasteReport.findById(
      req.params.id
    );

  if (!report) {
    return res.status(404).json({
      message: "Report not found"
    });
  }

  report.status =
    "collected";

  await Notification.create({
    user: report.reportedBy,

    message:
      "Your waste report has been collected successfully."
  });

  io.to(
    report.reportedBy.toString()
  ).emit(
    "notification",
    {
      message:
        "Your waste report has been collected successfully."
    }
  );

  const user =
    await User.findById(
      report.reportedBy
    );

  user.points += 20;

  user.badge =
    getBadge(user.points);

  await user.save();

  await report.save();

  res.json(report);
};
// 8..get leaderboard

export const getLeaderboard =
async (req, res) => {

  const users =
    await User.find()
      .sort({ points: -1 })
      .select(
        "name points badge"
      );

  res.json(users);
};

// 9..get my rewards
export const getMyRewards =
async (req, res) => {

  const user =
    await User.findById(
      req.user._id
    ).select(
      "name points badge"
    );

  res.json(user);
};
// 10..get my report count
export const getMyReportCount = async (req, res) => {
  try {
    const count = await WasteReport.countDocuments({
      reportedBy: req.user._id,
    });

    res.json({ count });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// 11..get assigned reports for collector
export const getAssignedReports = async (
  req,
  res
) => {
  try {

    const reports =
      await WasteReport.find({
        assignedCollector:
          req.user._id,
        status: "accepted"
      });

    res.json(reports);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};