import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

/* CORS FIRST */
app.use(cors({
  origin: "https://full-stack-authentication-sy-git-8c4580-urwas-projects-5a69df38.vercel.app/",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

/* OPTIONS HANDLER */
app.options("/*", (req, res) => {
  res.sendStatus(200);
});

/* ROUTES */
app.use("/api/auth", authRoutes);

/* HEALTH CHECK */
app.get("/", (req, res) => {
  res.send("🚀 Backend running on Railway");
});

/* DATABASE */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error("MongoDB error:", err);
    process.exit(1);
  });

/* SERVER */
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
