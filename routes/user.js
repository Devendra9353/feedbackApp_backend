const express = require("express");
const {
  getAllUsers,
  postReview,
  loginUser,
  registerUser,
  upload,
} = require("../controllers/user");
const router = express.Router();

router.get("/user-list", getAllUsers);
router.post("/review/:id", postReview);
router.post("/login", loginUser);
router.post("/register", upload.single("file"), registerUser);

module.exports = router;
