const express = require("express");
const router = express.Router();
const {likePhoto, getUserLikes, checkIfLiked, unlikePhoto} = require("../controllers/likeController")
const authenticateUser = require("../middleware/auth")


//Routes
router.route("/likePhoto").post(authenticateUser, likePhoto);
router.route("/getUserLikes").get(authenticateUser, getUserLikes);
router.route("/checkIfLiked").post(authenticateUser, checkIfLiked);
router.route("/unlikePhoto").post(authenticateUser, unlikePhoto);

module.exports = router;
