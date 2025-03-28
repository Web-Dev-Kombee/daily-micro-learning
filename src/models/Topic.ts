import mongoose from "mongoose";
import { Topic as TopicType } from "@/types";

const topicSchema = new mongoose.Schema<TopicType>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    color: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Topic =
  mongoose.models.Topic || mongoose.model<TopicType>("Topic", topicSchema);
