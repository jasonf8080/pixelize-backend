import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { deletePost, toggleDeletePost } from "../features/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const DeletePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {postId} = useParams();
  const {user} = useSelector((store) => store.auth)

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

    const handleDeletePost = async () => {
    try {
        await dispatch(deletePost(postId)).unwrap();
        navigate(`/myprofile/${user.username}`);
    } catch (error) {
        console.error("Delete failed:", error);
    }
};


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="z-[99] fixed inset-0  bg-black/70 flex justify-center items-center"
    >
      <motion.div
        initial={{ scale: 0.96 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="w-[600px] h-[220px] bg-white dark:bg-[#111]  dark:text-white rounded-lg flex justify-center items-center flex-col relative shadow-xl"
      >
        {/* Close */}
        <button
          onClick={() => dispatch(toggleDeletePost())}
          className="
            absolute top-3 right-3
            w-8 h-8
            rounded-full
            flex items-center justify-center
            text-gray-500
            hover:bg-gray-100
            hover:text-black
            transition
          "
        >
          ✕
        </button>

        <p className="text-lg font-medium  text-center px-6">
          Are you sure you would like to delete this post?
        </p>

        <div className="flex gap-4 mt-6">
          {/* Confirm */}
          <button
            onClick={handleDeletePost}
            className="btn btn-danger"
          >
            Yes, delete
          </button>

          {/* Cancel */}
          <button
            onClick={() => dispatch(toggleDeletePost())}
            className="btn btn-outline"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DeletePost;
