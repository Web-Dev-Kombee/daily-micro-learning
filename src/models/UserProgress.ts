import mongoose, { Document, Model } from "mongoose";
import { UserProgress as UserProgressType } from "../types";

export interface UserProgressDocument
  extends Document,
    Omit<UserProgressType, "id"> {}

const userProgressSchema = new mongoose.Schema<UserProgressDocument>(
  {
    topicId: { type: String, required: true },
    completedLessons: { type: Number, default: 0 },
    lastActivity: { type: String, required: true },
    streak: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const UserProgress: Model<UserProgressDocument> =
  mongoose.models.UserProgress ||
  mongoose.model<UserProgressDocument>("UserProgress", userProgressSchema);
