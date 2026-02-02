const Photo = require("../schemas/photoSchema");
const Like = require("../schemas/likeSchema");


const likePhoto = async (req, res) => {
  const { id, regular, username, profile_picture } = req.body;
  const userId = req.user.userId;

  // 1) Create photo if it doesn't exist (atomic)
  const photo = await Photo.findOneAndUpdate(
    { id }, // unsplash id
    { $setOnInsert: { id, regular, username, profile_picture } },
    { new: true, upsert: true }
  );

  // 2) Create Like (prevents duplicates if you add unique index)
  try {
    const like = await Like.create({ userId: userId, photoId: photo._id, photoUnsplashId: id });

    return res.status(201).json({liked: true});
  } catch (err) {
    // if duplicate like
    console.log(err)
    if (err.code === 11000) {
      return res.status(200).json({ message: "Already liked", photo });
    }
    throw err;
  }
};

const getUserLikes = async(req, res) => {
  const userId = req.user.userId;

 const likes = await Like.find({ userId }).sort({ createdAt: -1 }).populate('photoId');
  res.status(200).json(likes)
}

const checkIfLiked = async (req, res) => {
  const userId = req.user.userId;
  const { photoId } = req.body; 
  
  const isLiked = await Like.findOne({
    userId,
    photoUnsplashId: photoId,
  });

  if(!isLiked){
    res.status(200).json({like: false})
  }

  if(isLiked){
    res.status(200).json({like: true})
  }
}

const unlikePhoto = async(req, res) => {
  const userId = req.user.userId;
  const {photoId} = req.body;

  const like = await Like.findOneAndDelete({userId, photoUnsplashId: photoId})
  res.status(200).json({liked: false})
}

module.exports = { likePhoto, getUserLikes, checkIfLiked, unlikePhoto };
