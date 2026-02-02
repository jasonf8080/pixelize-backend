const express = require("express");
const router = express.Router();
const {register, login, getCurrentUser, editProfile, logout} = require("../controllers/userController")
const authenticateUser = require("../middleware/auth")
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
});

//Routes
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/getCurrentUser").get(authenticateUser, getCurrentUser);
router.route("/editProfile").patch(authenticateUser, upload.single("avatar"), editProfile);
router.route("/logout").post(authenticateUser, logout);


module.exports = router;
