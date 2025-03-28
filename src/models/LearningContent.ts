import mongoose, { Document, Model } from "mongoose";
import { LearningContent as LearningContentType } from "../types";

export interface LearningContentDocument
  extends Document,
    Omit<LearningContentType, "id"> {}

const learningContentSchema = new mongoose.Schema<LearningContentDocument>(
  {
    topicId: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    source: { type: String },
    readTime: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const LearningContent: Model<LearningContentDocument> =
  mongoose.models.LearningContent ||
  mongoose.model<LearningContentDocument>(
    "LearningContent",
    learningContentSchema
  );
