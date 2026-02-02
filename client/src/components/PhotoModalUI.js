
import React, {useEffect} from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { VscHeartFilled } from "react-icons/vsc";
import { FiDownload } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";
import defaultUser from "../images/defaultUser.webp"

const PhotoModalUI = ({id, loading, imageData, actions, capabilities}) => {
    const navigate = useNavigate();
    //imageData is expecting these fields-- so in both instances unsplash and mongo fetch.. you need to massage data to get in this desired object
  const { imageUrl, username, profile_picture, description, created_at, downloads,likes, tags, isLiked} = imageData;
   const {setActiveCategory, setQueryObject} = useGlobalContext();


     
const returnToHome = () => {
    navigate(-1)
}

const handleDownload = () => {
    const link = document.createElement('a')
    link.href = imageData.image;
    link.download = imageData.slug;

    link.click();
}


const handleTagClick = (tag) => {
    setActiveCategory(null)
    setQueryObject({tempQuery: tag, query: tag, newQuery: true})
    navigate('/')
}

    
    //yes ui--
useEffect(() => {
    window.scrollTo(0,0)
}, [id])


  return (
    <>
      <section className="relative  max-w-7xl mx-auto p-5 md:p-10 dark:text-white">
        {/* Close */}
        <button
          type="button"
          className="text-3xl md:text-4xl"
          onClick={returnToHome}
          aria-label="Close"
        >
          <LiaTimesSolid />
        </button>

        <div className="max-w-full mx-auto mt-5">
          {/* Image */}
          <div className="max-w-[700px] min-h-[300px] md:min-h-[700px] mx-auto">
            {loading ? (
              <div className="skeleton-loader rounded-lg min-h-[300px] md:min-h-[700px]" />
            ) : (
              <img
                src={imageUrl}
                className="mx-auto max-w-full min-w-full h-auto rounded-lg"
                alt=""
              />
            )}
          </div>

          <div className="max-w-[700px] mx-auto">
            {/* Profile + Actions */}
            <div className="mt-6 flex flex-col-reverse justify-between md:flex-row md:items-center w-full">
              <Link className="flex items-center mt-4 md:mt-0" to={`/profile/${username || ""}`}>
                {loading ? (
                  <div className="skeleton-loader max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] md:min-w-[45px] md:min-h-[45px] md:max-w-[45px] md:max-h-[45px] rounded-full" />
                ) : (
                  <img
                    src={profile_picture || defaultUser}
                    className="w-[40px] md:w-[45px] h-auto rounded-full"
                    alt=""
                  />
                )}

                <h1 className="text-lg md:text-xl ml-3 md:ml-5">
                  {loading ? "Loading..." : username}
                </h1>
              </Link>

             {capabilities.like &&
              <div className="flex items-center ">
                <button
                  type="button"
                  disabled={loading}
                  id="like-btn"
                  className="
                    mr-2
                    rounded-full
                    w-[40px] h-[40px]
                    md:w-[45px] md:h-[45px]
                    flex justify-center items-center
                    bg-transparent
                    border-[1px] border-[#ddd]
                    dark:border-[#333]
                    text-black dark:text-white
                    shadow-lg dark:shadow-[#000000]
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                  "
                  onClick={() => actions.onToggleLike()}
                  aria-label="Like"
                >
                  <span
                    className={`${
                      !isLiked ? "text-black dark:text-white" : "text-red-500"
                    } text-xl md:text-2xl`}
                  >
                    <VscHeartFilled />
                  </span>
                </button>

                <button
                  type="button"
                  disabled={loading}
                  id="download-btn"
                  className="
                    rounded-full
                    w-[40px] h-[40px]
                    md:w-[45px] md:h-[45px]
                    flex justify-center items-center
                    bg-transparent
                    border-[1px] border-[#ddd]
                    dark:border-[#333]
                    text-black dark:text-white
                    shadow-lg dark:shadow-[#000000]
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                  "
                  onClick={handleDownload}
                  aria-label="Download"
                >
                  <span className="text-xl md:text-2xl">
                    <FiDownload />
                  </span>
                </button>
              </div>}
              
              {capabilities.delete && <button className="btn btn-outline " onClick={() => actions.onDeletePost()}>Remove Post</button>}
            </div>

            {/* Description */}
            <p className="mt-8 ml-6">
              {loading ? "Loading..." : description}
            </p>

            {/* Tags */}
            <div className="mt-6 md:mt-10 border-b-[2px] border-secondary-color dark:border-main-color py-6">
              {Array.isArray(tags) && tags.length > 0 ? (
                tags.map((tag, index) => (
                  <button
                    key={`${tag}-${index}`}
                    type="button"
                    className="
                      uppercase mr-3 mb-3
                      border-[1px] border-[#ddd]
                      dark:border-[#333]
                      text-black dark:text-white
                      shadow-lg dark:shadow-[#000]
                      px-4 md:px-6 py-2
                      rounded-md
                      text-xs md:text-sm
                      hover:bg-secondary-color hover:text-white hover:border-secondary-color
                      dark:hover:bg-main-color dark:hover:border-main-color
                    "
                    onClick={() => handleTagClick(tag.title || tag)}
                  >
                    {`# ${tag.title || tag}`}
                  </button>
                ))
              ) : null}
            </div>

            {/* Date */}
            <p className="mt-6 md:mt-12 text-sm">
              Posted: {loading ? "Loading..." : created_at}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default PhotoModalUI;
