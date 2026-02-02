const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const postSchema = new mongoose.Schema(
  {
    //Passed through multer to cloudinary
    image: { 
        type: String, 
        default: "" 
    }, 

    caption: { 
        type: String, 
        default: "",
        maxlength: 160 
    },
    
    tags: { 
        type: [String], 
        default: "", 
    },

    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: ""
    }
  },
  { timestamps: true }
);





module.exports = mongoose.model("Post", postSchema);
