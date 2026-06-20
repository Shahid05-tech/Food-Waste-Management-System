import WasteReport from "../models/WasteReport.js";
import User from "../models/User.js";
import PDFDocument from "pdfkit";

// 1.get adminstats
export const getAdminStats = async (
  req,
  res
) => {
  try {

    const totalReports =
      await WasteReport.countDocuments();

    const reported =
      await WasteReport.countDocuments({
        status: "reported"
      });

    const accepted =
      await WasteReport.countDocuments({
        status: "accepted"
      });

    const collected =
      await WasteReport.countDocuments({
        status: "collected"
      });

    const totalUsers =
      await User.countDocuments({
        role: "citizen"
      });

    const totalCollectors =
      await User.countDocuments({
        role: "collector"
      });

    const topContributor =
      await User.findOne()
        .sort({ points: -1 })
        .select(
          "name points badge"
        );

    // Collection Success Rate

    const collectionRate =
      totalReports > 0
        ? (
            (collected /
              totalReports) *
            100
          ).toFixed(1)
        : 0;

    // Waste Hotspots

    const reports =
      await WasteReport.find();

    const hotspotMap = {};

    reports.forEach((report) => {

      if (
        report.location &&
        report.location.coordinates
      ) {

        const lat =
          report.location.coordinates[1]
            .toFixed(2);

        const lng =
          report.location.coordinates[0]
            .toFixed(2);

        const area =
          `${lat}, ${lng}`;

        hotspotMap[area] =
          (hotspotMap[area] || 0) + 1;
      }
    });

    const hotspots =
      Object.entries(
        hotspotMap
      )
        .map(
          ([area, count]) => ({
            area,
            count
          })
        )
        .sort(
          (a, b) =>
            b.count - a.count
        )
        .slice(0, 5);

    res.json({
      totalReports,
      reported,
      accepted,
      collected,
      totalUsers,
      totalCollectors,
      topContributor,
      collectionRate,
      hotspots
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

// 2. generate pdf
export const generatePDFReport =
  async (req, res) => {

    try {

      const reports =
        await WasteReport.find();

      const totalReports =
        reports.length;

      const reported =
        reports.filter(
          r => r.status === "reported"
        ).length;

      const accepted =
        reports.filter(
          r => r.status === "accepted"
        ).length;

      const collected =
        reports.filter(
          r => r.status === "collected"
        ).length;

      const users =
        await User.find();

      const topContributor =
        users.sort(
          (a, b) =>
            b.points - a.points
        )[0];

      const doc =
        new PDFDocument();

      res.setHeader(
        "Content-Type",
        "application/pdf"
      );

      res.setHeader(
        "Content-Disposition",
        "attachment; filename=food-waste-report.pdf"
      );

      doc.pipe(res);

      doc
        .fontSize(24)
        .text(
          "Food Waste Management Report",
          {
            align: "center"
          }
        );

      doc.moveDown();

      doc.fontSize(16);

      doc.text(
        `Total Reports: ${totalReports}`
      );

      doc.text(
        `Reported: ${reported}`
      );

      doc.text(
        `Accepted: ${accepted}`
      );

      doc.text(
        `Collected: ${collected}`
      );

      doc.moveDown();

      doc.text(
        `Top Contributor: ${
          topContributor?.name || "N/A"
        }`
      );

      doc.text(
        `Points: ${
          topContributor?.points || 0
        }`
      );

      doc.moveDown();

      doc.text(
        `Generated On: ${
          new Date().toLocaleString()
        }`
      );

      doc.end();

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }
  };