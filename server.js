const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

require("dotenv").config();
const app = express();

const mongoose = require("mongoose");


const userRouter = require("./routes/userRouter");
const likeRouter = require("./routes/likeRouter");
const postRouter = require("./routes/postRouter");

const notFound = require("./middleware/notFound")
const errorHandler = require("./middleware/errorHandler")


app.use(cors());
app.use(express.json());
app.use(morgan("dev")); 

app.get("/", (req, res) => {
 res.send('Hey')
});

app.use(cookieParser());

app.use("/api/auth", userRouter);
app.use("/api/like", likeRouter);
app.use("/api/post", postRouter);

app.use(notFound);
app.use(errorHandler);


// const PORT = process.env.PORT || 4000;

// app.listen(PORT, async () => {
//   await connectDB();
//   console.log(`Server running on http://localhost:4000`);
// });

const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on http://localhost:${PORT}`);
});


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
