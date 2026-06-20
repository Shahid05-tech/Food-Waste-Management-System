import mongoose from "mongoose";

const wasteReportSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    aiAnalysis: {
  foodType: String,

  quantity: String,

  edible: Boolean,

  urgency: String,

  confidence: Number
    },
    assignedCollector: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
},
points: {
  type: Number,
  default: 0
},

badge: {
  type: String,
  default: "Beginner"
},

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },

      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
status: {
  type: String,
  enum: [
    "reported",
    "accepted",
    "collected",
    "processed"
  ],
  default: "reported"
},

    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
     imageUrl: {
   type: String,
   required: true
},
  },
  {
    timestamps: true,
  }
);

wasteReportSchema.index({
  location: "2dsphere",
});

// export default mongoose.model(
//   "WasteReport",
//   wasteReportSchema
// );
const WasteReport =
  mongoose.models.WasteReport ||
  mongoose.model(
    "WasteReport",
    wasteReportSchema
  );

export default WasteReport;