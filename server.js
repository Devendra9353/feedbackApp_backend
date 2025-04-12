const express = require("express");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const path = require("path");
const multer = require("multer");
const userRouter = require("./routes/user.js");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require("dotenv").config();

const user = require("./model/User.js");
const cors = require("cors");
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://devu935352:A5eidBqmrtUKFoyo@cluster0.ocvoeco.mongodb.net/?tlsAllowInvalidCertificates=true",
    { dbName: "image-uploader" }
  )
  .then(() => {
    console.log(`connected successfully`);
  })
  .catch((err) => console.log("error", err));

app.use("/api/user", userRouter);

app.listen(1000, () => console.log("listening on port 1000"));
