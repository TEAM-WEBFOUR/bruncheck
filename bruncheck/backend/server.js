const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const router = express.Router();

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: null,
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(express.json());

console.log("TEST");

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const questionsRouter = require("./routes/questions");
const usersRouter = require("./routes/users");
const settingRouter = require("./routes/setting");
// const uploadersRouter = require('./routes/uploaders')

app.use("/questions", questionsRouter);
app.use("/users", usersRouter);
app.use("/setting", settingRouter);
// app.use('/upload', uploadersRouter);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../src/img/");
  },
  filename: (req, file, cb) => {
    cb(null, "logo.png");
  },
});

const upload = multer({ storage: storage });

app.post("/image", upload.single("file"), function (req, res) {
  res.json({});
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
