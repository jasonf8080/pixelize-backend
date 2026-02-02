const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
const mongoose = require("mongoose");

require("dotenv").config();

const userRouter = require("./routes/userRouter");
const likeRouter = require("./routes/likeRouter");
const postRouter = require("./routes/postRouter");

const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();

/* -------------------- DB -------------------- */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

/* -------------------- Middleware -------------------- */
app.set("trust proxy", 1); // important on Render (secure cookies, proxies)

app.use(
  cors({
    origin: [
      process.env.CLIENT_URL, // e.g. https://pixelize.vercel.app
      "http://localhost:3000",
    ].filter(Boolean),
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan("dev"));

/* -------------------- API Routes -------------------- */
app.get("/api", (req, res) => {
  res.send("API running");
});

app.use("/api/auth", userRouter);
app.use("/api/like", likeRouter);
app.use("/api/post", postRouter);

/* -------------------- Serve React in Production -------------------- */
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));

  // SPA fallback (must be AFTER API routes)
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

/* -------------------- Errors -------------------- */
app.use(notFound);
app.use(errorHandler);

/* -------------------- Start -------------------- */
const PORT = process.env.PORT || 4000;

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

start();
