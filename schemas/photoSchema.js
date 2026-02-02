const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema(
  {
    // Unsplash photo id
    id: {
      type: String,
      required: true,
      index: true,
    },

    // Image URL (regular size from Unsplash)
    regular: {
      type: String,
      required: true,
    },

    // Unsplash username (photo owner on Unsplash)
    username: {
      type: String,
      required: true,
    },

    // Unsplash profile image
    profile_picture: {
      type: String,
      required: true,
    },
  }
);

module.exports = mongoose.model("Photo", photoSchema);
