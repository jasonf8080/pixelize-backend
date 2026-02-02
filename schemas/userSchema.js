const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: { 
        type: String,
        required: true, 
        unique: true,
        trim: true  //Remove white space
    },

    password: { 
        type: String,
        required: true, 
        select: false 
    }, // hide by default

    bio: { 
        type: String, 
        default: "",
        maxlength: 160 
    },
    
    location: { 
        type: String, 
        default: "", 
        maxlength: 50 
    },

     //Passed through multer to cloudinary
    avatarUrl: { 
        type: String, 
        default: "" 
    } // for later (Cloudinary)
  },
  { timestamps: true }
);


//Hash Password
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});




module.exports = mongoose.model("User", userSchema);
