const express = require("express");
const router = express.Router();
const multer = require("multer")
const {createPost, getAllPosts, getSinglePost, deletePost} = require("../controllers/postController")
const authenticateUser = require("../middleware/auth")

const upload = multer({ storage: multer.memoryStorage() });

//Routes
router.route("/createPost").post(authenticateUser, upload.single("image"), createPost);
router.route("/getAllPosts").get(authenticateUser, getAllPosts);
router.route("/getSinglePost/:postId").get(authenticateUser, getSinglePost);
router.route("/deletePost/:postId").delete(authenticateUser, deletePost);

module.exports = router;
