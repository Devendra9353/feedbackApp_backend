const Review = require("../model/Review");
const user = require("../model/User");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const path = require("path");
const multer = require("multer");

exports.getAllUsers = async (req, res) => {
  const allUsers = await user.find({});
  console.log(allUsers);
  if (!allUsers) {
    return res.status(404).json({ message: "No users found" });
  }
  res.status(200).json(allUsers);
};

exports.postReview = async (req, res) => {
  const { name, email, review, time, userId } = req.body;
  // console.log(userId);
  const { id } = req.params;
  if (!name || !email || !review) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const userDetail = await user.findById(id);
  if (!userDetail) {
    return res.status(404).json({ message: "User not found" });
  }
  const newReview = {
    name,
    email,
    review,
    time,
    hostId: userDetail._id,
  };

  const savedReview = await Review.create(newReview);
  res.status(201).json(savedReview);
  console.log(savedReview);
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const userDetail = await user.findOne({ email });

  if (!userDetail) {
    return res.status(404).json({ message: "User not found" });
  }

  if (userDetail.password !== password) {
    return res.status(401).json({ message: "Invalid password" });
  }
  // User is authenticated, you can return user details or a token

  const reviews = await Review.find({ hostId: userDetail._id });
  console.log("logged in successfully", userDetail, reviews);
  res.status(200).json({ user: userDetail, reviews });
};

cloudinary.config({
  cloud_name: "dnzlynt1j",
  api_key: "819854717592932",
  api_secret: "5bvbZZOCEWqFq6txlRG35CCtyuI",
});
const storage = multer.diskStorage({
  // destination: "./public/uploads",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

exports.upload = multer({ storage: storage });

exports.registerUser = async (req, res) => {
  const file = req.file.path;
  // console.log(file);
  const { name, email, password } = req.body;
  const userExist = await user.findOne({ email });
  if (userExist)
    return res.status(400).json({ message: "User already exists" });
  const cloudinaryRes = await cloudinary.uploader.upload(file, {
    folder: "nodejs_website",
  });

  //creating User
  const db = await user.create({
    name,
    email,
    password,
    fileName: file.originalname,
    public_id: cloudinaryRes.public_id,
    imgUrl: cloudinaryRes.secure_url,
  });
  res.json(db);
};
