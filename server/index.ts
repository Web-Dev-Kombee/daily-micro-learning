import express, { Request } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { LearningContent } from "../src/models/LearningContent.js";
import { UserProgress } from "../src/models/UserProgress.js";
import { Topic } from "../src/models/Topic.js";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
}

interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

// Extend Express Request type
declare module "express" {
  interface Request {
    user?: JwtPayload;
  }
}

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Authentication middleware
const authenticateToken = (
  req: AuthenticatedRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    ) as JwtPayload;
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
};

// MongoDB Connection
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/ai-knowledge-sprout";

console.log("Attempting to connect to MongoDB...");
mongoose
  .connect(MONGODB_URI)
  .then(async () => {
    console.log("MongoDB Connected Successfully");

    // Seed initial topics if none exist
    const topicCount = await Topic.countDocuments();
    if (topicCount === 0) {
      const initialTopics = [
        {
          title: "Artificial Intelligence",
          description:
            "Explore the world of AI, machine learning, and neural networks.",
          icon: "🧠",
          color: "blue",
        },
        {
          title: "Web Development",
          description:
            "Master modern web technologies, frameworks, and best practices.",
          icon: "💻",
          color: "green",
        },
        {
          title: "Data Science",
          description:
            "Understand data analysis, visualization, and statistical methods.",
          icon: "📊",
          color: "purple",
        },
        {
          title: "Design Principles",
          description:
            "Learn about UX/UI design, visual hierarchy, and user-centered design methods.",
          icon: "🎨",
          color: "yellow",
        },
        {
          title: "Productivity",
          description:
            "Discover techniques to improve focus, time management, and efficiency.",
          icon: "⏱️",
          color: "orange",
        },
      ];

      await Topic.insertMany(initialTopics);
      console.log("Initial topics seeded successfully");
    }
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Topics Route
app.get(
  "/api/topics",
  authenticateToken,
  async (req: AuthenticatedRequest, res) => {
    try {
      const topics = await Topic.find().lean();
      res.json(topics);
    } catch (error) {
      console.error("Error fetching topics:", error);
      res.status(500).json({ error: "Failed to fetch topics" });
    }
  }
);

// API Routes
app.get(
  "/api/content/:topicId",
  authenticateToken,
  async (req: AuthenticatedRequest, res) => {
    try {
      console.log(`Fetching content for topic: ${req.params.topicId}`);
      const content = await LearningContent.find({
        topicId: req.params.topicId,
      })
        .sort({ createdAt: -1 })
        .lean();
      res.json(content);
    } catch (error) {
      console.error("Error fetching content:", error);
      res.status(500).json({ error: "Failed to fetch content" });
    }
  }
);

app.get(
  "/api/progress/:topicId",
  authenticateToken,
  async (req: AuthenticatedRequest, res) => {
    try {
      console.log(`Fetching progress for topic: ${req.params.topicId}`);
      if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
      }
      const progress = await UserProgress.findOne({
        topicId: req.params.topicId,
        userId: req.user.userId,
      }).lean();
      if (!progress) {
        console.log("No progress found, creating new progress");
        const newProgress = await UserProgress.create({
          topicId: req.params.topicId,
          userId: req.user.userId,
          completedLessons: 0,
          lastActivity: new Date().toISOString(),
          streak: 0,
        });
        res.json(newProgress);
      } else {
        res.json(progress);
      }
    } catch (error) {
      console.error("Error fetching progress:", error);
      res.status(500).json({ error: "Failed to fetch progress" });
    }
  }
);

app.post(
  "/api/content",
  authenticateToken,
  async (req: AuthenticatedRequest, res) => {
    try {
      console.log("Creating new content:", req.body);
      if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
      }
      const content = await LearningContent.create({
        ...req.body,
        userId: req.user.userId,
      });
      res.json(content);
    } catch (error) {
      console.error("Error creating content:", error);
      res.status(500).json({ error: "Failed to create content" });
    }
  }
);

app.put(
  "/api/progress/:topicId",
  authenticateToken,
  async (req: AuthenticatedRequest, res) => {
    try {
      console.log(`Updating progress for topic: ${req.params.topicId}`);
      if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
      }
      const progress = await UserProgress.findOneAndUpdate(
        { topicId: req.params.topicId, userId: req.user.userId },
        {
          $inc: {
            completedLessons: 1,
            streak: 1,
          },
          lastActivity: new Date().toISOString(),
        },
        { new: true }
      ).lean();
      res.json(progress);
    } catch (error) {
      console.error("Error updating progress:", error);
      res.status(500).json({ error: "Failed to update progress" });
    }
  }
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});
