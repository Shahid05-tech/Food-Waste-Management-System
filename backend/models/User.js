import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["citizen", "collector", "admin"],
      default: "citizen"
    },

    points: {
      type: Number,
      default: 0
    },

    badge: {
      type: String,
      default: "Beginner"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("User", userSchema);