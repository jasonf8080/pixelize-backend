import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";

import defaultUser from "../images/defaultUser.webp";
import UploadPost from "./UploadPost";
import { submitPost, toggleCreatePost } from "../features/postSlice";

const CreatePost = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { submitPostLoading } = useSelector((store) => store.post);

//   const [tags, setTags] = useState([]);
  const [showTagInput, setShowTagInput] = useState(false)
  const [tagInput, setTagInput] = useState("");

  //Post
  const [formData, setFormData] = useState({
    image: '',
    imageFile: '',
    imagePreview: '',
    caption: '',
    tags: []
  })

  useEffect(() => {
    // Disable scroll when mounted
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Re-enable scroll when unmounted
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

const handlePostChange = ({ file, previewUrl }) => {
  setFormData((prev) => ({
    ...prev,
    imagePreview: previewUrl || "",
    imageFile: file || null,
  }));
};


    const handleChange = (e) => {
    const { name, value } = e.target;

    // normal field update
    setFormData((prev) => ({
        ...prev,
        [name]: value,
    }));
    };

   const handleImageRemove = () => {
     setFormData((prev) => ({
    ...prev,
    imagePreview:  "",
    imageFile: null,
  }));
   }

   const handleTagSubmit = (newTag) => {
     setFormData({...formData, tags:[...formData.tags, newTag]})
     setTagInput('')
   }

  const handleTagRemove = (deleteTag) => {
    const newTags = formData.tags.filter((tag) => tag !== deleteTag)
    setFormData({...formData, tags: newTags})
  }



  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="z-[99] fixed top-0 left-0 bg-black bg-opacity-70 w-[100vw] h-[100vh] flex justify-center items-center"
    >
      <div className="w-[800px] h-[550px] bg-white dark:bg-[#111] dark:text-white rounded-lg flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center p-6 border-b dark:border-b-slate-800 shrink-0">
          <button onClick={() => dispatch(toggleCreatePost())}>x</button>
          <p>Create new post</p>
          <button 

            disabled={!formData.imagePreview}
            className={`${!formData.imagePreview ? 'text-[#ddd]' : 'text-black'}`}
            onClick={() => dispatch(submitPost(formData))}>

          {submitPostLoading ? <div className="btn-loader"><div class="loader"></div></div> : 'Share' }
        </button>
      
            
        </header>

        {/* Content */}
        <div className="flex flex-col md:flex-row flex-1 w-full overflow-scroll">
          {/* Left side (media) */}
          <div className="w-full md:w-[60%]">
           {!formData.imagePreview ?
            <UploadPost handlePostChange={handlePostChange} />
            : 
            <div className="relative">
                  <button 
                  onClick={handleImageRemove}
                  className="absolute top-3 right-3 bg-white px-4 py-2 text-red-500 rounded-md shadow-lg text-sm">
                    Remove
                  </button>
                  <img src={formData.imagePreview} className="block max-w-full max-h-full min-w-full min-h-full"/>
            </div>
          
            }
          </div>

          {/* Divider */}
          <div className="w-px bg-slate-200 dark:bg-slate-800 mr-2" />

          {/* Right side (details) */}
          <div className="w-full md:w-[40%] p-4">
            {/* User row */}
            <div className="flex items-center">
              <img
                className="w-[30px] h-[30px] rounded-full mr-3"
                src={user.avatarUrl || defaultUser}
                alt=""
              />
              <h3>{user.username}</h3>
            </div>

            {/* Caption */}
            <div>
              <textarea
                rows={4}
                name="caption"
                value={formData.caption}
                onChange={handleChange}
                placeholder="Caption about your post..."
                className="
                  mt-6
                  w-full
                  resize-none
                  border-b border-b-slate-200
                  bg-white dark:bg-[#111]
                  text-sm text-slate-900 dark:text-white
                  outline-none
                  transition
                  focus:border-slate-400
                "
              />
              <div className="mt-2 text-xs text-slate-400">{formData.caption.length} / 160</div>
            </div>

            {/* Add tag button */}
            <button
              onClick={() => setShowTagInput(!showTagInput)}
              className="
                mt-6
                mb-2
                text-sm
                font-medium
                text-slate-400
                hover:text-slate-700
                transition
              "
            >
             {!showTagInput ?' Add Tag +' : 'Done -'}
    
            </button>

            {/* Tag input */}
          {showTagInput &&   
          <div className="flex items-center border border-[#ddd] rounded-md shadow-lg px-3 py-2 w-fit">
              <span className="mr-1 text-sm text-gray-400">#</span>

              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                type="text"
                className="
                  outline-none
                  uppercase
                  text-black
                  text-sm
                  bg-transparent
                  w-24
                "
                placeholder="tag"
              />

              {tagInput.length > 0 && (
                <button
                  className="ml-2 text-green-600"
                  onClick={() => handleTagSubmit(tagInput)}
                >
                  <FaCheck />
                </button>
              )}
            </div>}

            <div className="border-t border-b-slate-200 w-full my-3"></div>
              
            <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => {
                       return (
                       <button
                       key={`${tag}${index}`}
                        className='uppercase  
                      border-[1px] border-[#ddd]
                       text-black
                      shadow-lg
                      px-4 py-2
                      rounded-md text-xs '>
                        {`# ${tag}`}
                        <span className="ml-4" onClick={() => handleTagRemove(tag)}>x</span>
                      </button>)
                })}
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CreatePost;
