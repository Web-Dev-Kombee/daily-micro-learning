const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/ai-knowledge-sprout";

console.log("Attempting to connect to MongoDB...");
mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });

// Define Mongoose Models
const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const learningContentSchema = new mongoose.Schema(
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

const userProgressSchema = new mongoose.Schema(
    {
        topicId: { type: String, required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        completedLessons: { type: Number, default: 0 },
        lastActivity: { type: String, required: true },
        streak: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);
const LearningContent = mongoose.model('LearningContent', learningContentSchema);
const UserProgress = mongoose.model('UserProgress', userProgressSchema);

// Authentication Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};

// Auth Routes
app.post("/api/auth/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already registered" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // Generate token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '7d' }
        );

        res.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            token,
        });
    } catch (error) {
        console.error("Error in signup:", error);
        res.status(500).json({ error: "Failed to create user" });
    }
});

app.post("/api/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Check password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Generate token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '7d' }
        );

        res.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            token,
        });
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ error: "Failed to login" });
    }
});

// Protected Routes - Update to require authentication
app.get("/api/content/:topicId", authenticateToken, async (req, res) => {
    try {
        console.log(`Fetching content for topic: ${req.params.topicId}`);
        const content = await LearningContent.find({ topicId: req.params.topicId })
            .sort({ createdAt: -1 })
            .lean();
        res.json(content);
    } catch (error) {
        console.error("Error fetching content:", error);
        res.status(500).json({ error: "Failed to fetch content" });
    }
});

app.get("/api/progress/:topicId", authenticateToken, async (req, res) => {
    try {
        console.log(`Fetching progress for topic: ${req.params.topicId}`);
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
});

app.post("/api/content", authenticateToken, async (req, res) => {
    try {
        console.log("Creating new content:", req.body);
        const content = await LearningContent.create(req.body);
        res.json(content);
    } catch (error) {
        console.error("Error creating content:", error);
        res.status(500).json({ error: "Failed to create content" });
    }
});

app.put("/api/progress/:topicId", authenticateToken, async (req, res) => {
    try {
        console.log(`Updating progress for topic: ${req.params.topicId}`);
        const progress = await UserProgress.findOneAndUpdate(
            {
                topicId: req.params.topicId,
                userId: req.user.userId
            },
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
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API available at http://localhost:${PORT}/api`);
}); 