
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";

const app = express();

/* ======================
   MIDDLEWARE
====================== */
app.use(express.json());

app.use(cors({
  origin: "https://full-stack-authentication-system-fr.vercel.app",
  credentials: true
}));

// Preflight support (SAFE)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://full-stack-authentication-system-fr.vercel.app");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

/* ======================
   ROUTES
====================== */
app.use("/api/auth", authRoutes);

/* ======================
   ROOT CHECK
====================== */
app.get("/", (req, res) => {
  res.send("🚀 Railway backend running");
});

/* ======================
   SERVER
====================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
