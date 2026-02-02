import React from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsImages } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

import defaultUser from "../images/defaultUser.webp";
import ProfileLoader from "./loaders/ProfileLoader";
import { toggleCreatePost } from "../features/postSlice";

const MongoUser = ({ totalPhotos, actions, isEditing, setIsEditing }) => {
  const dispatch = useDispatch();
  const { profileLoading, user } = useSelector((store) => store.auth);

  if (profileLoading) return <ProfileLoader />;

  const avatarSrc = user?.avatarUrl || defaultUser;
  const showActions = actions === "edit";
  const hasLocation = Boolean(user?.location);

  const handleNewPost = () => dispatch(toggleCreatePost());
  const handleEditProfile = () => setIsEditing(!isEditing);

  return (
    <section className="relative mx-auto flex max-w-7xl flex-col items-center justify-center py-12">
      {/* Avatar */}
      <div className="relative mb-8 h-[200px] min-w-[200px] max-w-[200px] rounded-full border-[2px] border-gray-200">
        <img
          src={avatarSrc}
          alt=""
          className="h-full w-full max-w-[100%] rounded-full"
        />
      </div>

      {/* Content */}
      <div className="max-w-full px-5 text-center">
        <h3 className="mb-4 text-2xl text-black dark:text-white">
          {user?.username}
        </h3>

        {hasLocation && (
          <p className="mb-4 flex items-center justify-center text-center text-gray-600 dark:text-gray-400">
            <span className="mr-2 translate-y-[-2px]">
              <HiOutlineLocationMarker />
            </span>
            {user.location}
          </p>
        )}

        <p className="mb-0 max-w-[800px] text-center text-sm text-gray-600 dark:text-gray-400 md:text-lg">
          {user?.bio}
        </p>

        <p className="my-5 flex items-center justify-center text-center text-gray-600 dark:text-gray-400">
          <span className="mr-2 translate-y-[-2px] text-2xl">
            <BsImages />
          </span>
          {user.totalPosts}
        </p>

        {showActions && (
          <div className="mb-6 mt-5 flex items-center justify-center gap-3">
            <button onClick={handleNewPost} className="btn btn-primary">
              + New Post
            </button>

            <button onClick={handleEditProfile} className="btn btn-outline">
              Edit Profile
            </button>
          </div>
        )}

        <div className="mx-auto w-[200px] border-b-[2px] border-secondary-color px-5 dark:border-main-color md:px-10" />
      </div>
    </section>
  );
};

export default MongoUser;
