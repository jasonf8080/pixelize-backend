//User Controllers
const User = require("../schemas/userSchema");
const Post = require("../schemas/postSchema");
const generateToken = require("../utils/generateToken")
const attachCookie = require("../utils/attachCookie")
const bcrypt = require("bcryptjs");
const comparePassword = require("../utils/comparePassword");
const cloudinary = require("../utils/cloudinary")


const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    //Check empty fields 
    if (!username || !password) {
      return res.status(400).json({ message: "Please fill out all fields" });
    }
    
    //Spaces in username
    if (/\s/.test(username)) {
      return res.status(400).json({ message: "Username must not contain spaces" });
    }
     const cleanedUsername = username.trim().toLowerCase();

    //Username length 
    if (username.length < 1 || username.length > 20) {
      return res.status(400).json({ message: "Username must be 1–20 characters" });
    }
    
    //Existing user with the same username
    const existingUser = await User.findOne({ username: cleanedUsername });
    if (existingUser) {
      return res.status(409).json({ message: "Username already taken" });
    }
    
    
    //Create user in database
    const user = await User.create({ username: cleanedUsername, password });
    
    //Generate jwt token
    const token = generateToken(user._id)
    
    attachCookie(res, token);

    const safeUser = { _id: user._id, username: user.username, avatarUrl: user.avatarUrl };
    
    res.status(201).json({message: 'Sign Up successful, Redirecting...', user: safeUser});
    
  } catch (error) {
    //Safety net for duplicate username
    if (error.code === 11000) {
      return res.status(409).json({ message: "Username already exists" });
    } else {
      return res.status(500).json({ message: "Server error" });
    }
  }
};


const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check empty fields
    if (!username || !password) {
      return res.status(400).json({ message: "Please fill out all fields" });
    }

    const cleanedUsername = username.trim().toLowerCase();

    const user = await User.findOne({ username: cleanedUsername }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Password is incorrect" });
    }

    // Credentials are correct
    const token = generateToken(user._id);
    attachCookie(res, token);

    const safeUser = {
      _id: user._id,
      username: user.username,
      avatarUrl: user.avatarUrl,
      bio: user.bio,
      location: user.location,
    };

    return res.status(200).json({ message: "Login successful", user: safeUser });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });

    // User not found 
    if (!user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

   const totalPosts = await Post.countDocuments({userId: req.user.userId,});

   const safeUser = {
      _id: user._id,
      username: user.username,
      avatarUrl: user.avatarUrl,
      bio: user.bio,
      location: user.location,
      totalPosts
    };



    return res.status(200).json(safeUser);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};


const editProfile = async (req, res) => {
  try {

    const { username, location, bio } = req.body;
    const updateFields = {};

    if (username !== undefined) updateFields.username = username;
    if (location !== undefined) updateFields.location = location;
    if (bio !== undefined) updateFields.bio = bio;

    // If avatar file was sent
    if (req.file) {
      console.log("📸 uploading avatar to Cloudinary...");
      console.log("file info:", {
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size,
      });

      const uploaded = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "avatars" },
          (error, result) => {
            if (error) {
              console.error("❌ Cloudinary error:", error);
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        stream.end(req.file.buffer);
      });

      console.log("✅ Cloudinary upload success:", uploaded.secure_url);

      updateFields.avatarUrl = uploaded.secure_url;
    }

    console.log("📝 updateFields:", updateFields);

    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      updateFields,
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      console.warn("⚠️ User not found");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("✅ Profile updated successfully");

    res.status(200).json({
      message: "Changes saved",
      user: updatedUser,
    });
  } catch (error) {
    console.error("🔥 editProfile error:", error);

    res.status(500).json({
      message: "Failed to update profile",
      error: error.message,
    });
  }
};

const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0), 
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { logout };


module.exports = {
  register,
  login,
  getCurrentUser,
  editProfile, 
  logout
};
