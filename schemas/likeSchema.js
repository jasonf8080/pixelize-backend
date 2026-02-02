const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    photoId: {
      type: String,
      ref: "Photo",
      required: true,
    },

    photoUnsplashId: {
      type: String
    }
  },
  { timestamps: true }
);

// one user can like a photo only once
likeSchema.index({ userId: 1, photoId: 1 }, { unique: true });

module.exports = mongoose.model("Like", likeSchema);
