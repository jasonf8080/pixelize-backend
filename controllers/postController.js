const Post = require("../schemas/postSchema")
const cloudinary = require("../utils/cloudinary")

const createPost = async (req, res) => {
    try {
        const {caption, tags} = req.body
        const userId = req.user.userId


        if(req.file) {

        const uploaded = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
            { folder: "posts" },
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

        const newTags = JSON.parse(tags);

        const newPost = await Post.create({image: uploaded.secure_url, caption, tags: newTags, userId })
        res.status(200).json(newPost)
        // updateFields.avatarUrl = uploaded.secure_url;
        }
       
        res.send('create')
    } catch (error) {
        console.log(error)
        res.send(error)
    }
    
};

const getAllPosts = async(req, res) => {
    const userId = req.user.userId;

    try {
        const posts = await Post.find({userId}).sort({ createdAt: -1 })
        res.status(200).json(posts)
    } catch (error) {
        
    }
}

const getSinglePost = async(req, res) => {
    try {
        const { postId } = req.params;
        const post = await Post.findOne({ _id: postId }).populate("userId", "username avatarUrl");
        res.status(200).json(post)
    } catch (error) {
        console.log(error)
        res.send(error)
    }

}

const deletePost = async(req, res) => {
    try {
        const {postId} = req.params;
        const post = await Post.findOneAndDelete({_id: postId})
        console.log(post)
        res.status(200).json({message: 'post deleted'})

    } catch (error) {
        
    }
}



module.exports = { createPost, getAllPosts, getSinglePost, deletePost };
