import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();

// Middleware

// 1️⃣ Enable CORS for your frontend
app.use(cors({
  origin: 'https://full-stack-authentication-system-fr.vercel.app', // your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, // allow cookies/auth if needed
}));

// 2️⃣ Parse JSON bodies
app.use(express.json());

// 3️⃣ Handle preflight requests (important for POST/PUT)
app.options('*', cors({
  origin: 'https://full-stack-authentication-system-fr.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

// Routes
app.use("/api/auth", authRoutes);

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
