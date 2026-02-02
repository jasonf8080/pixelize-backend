import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { editProfile } from "../features/authSlice";
import UploadProfilePicture from "./UploadProfilePicture";
import ButtonLoader from "./ButtonLoader";

const MAX_BIO_LENGTH = 160;

const EditProfile = ({ isEditing, setIsEditing }) => {
  const dispatch = useDispatch();
  const { editProfileLoading, user } = useSelector((store) => store.auth);

  const [form, setForm] = useState({
    username: user?.username || "",
    location: user?.location || "",
    bio: user?.bio || "",
    avatarUrl: user?.avatarUrl || "",
    avatarFile: null,
  });

  // Sync form when user loads/changes
  useEffect(() => {
    if (!user) return;

    setForm((prev) => ({
      ...prev,
      username: user.username || "",
      location: user.location || "",
      bio: user.bio || "",
      avatarUrl: user.avatarUrl || "",
      avatarFile: null,
    }));
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "bio" ? value.slice(0, MAX_BIO_LENGTH) : value,
    }));
  };

  const handleAvatarChange = ({ file, previewUrl }) => {
    setForm((prev) => ({
      ...prev,
      avatarUrl: previewUrl,
      avatarFile: file,
    }));
  };

  const handleCancel = () => setIsEditing(!isEditing);

  const handleSubmit = async () => {
    const resultAction = await dispatch(
      editProfile({
        username: form.username,
        location: form.location,
        bio: form.bio,
        avatar: form.avatarFile,
      })
    );

    if (editProfile.fulfilled.match(resultAction)) {
      setIsEditing(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl px-4 pb-6 pt-10 text-center">
      {/* Avatar */}
      <UploadProfilePicture handleAvatarChange={handleAvatarChange} />

      {/* Inputs */}
      <div className="mt-10 space-y-6 text-left">
        <Field
          label="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Your name"
        />

        <Field
          label="Location"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="City, Country"
        />

        <Field
          as="textarea"
          rows={4}
          label="Bio"
          name="bio"
          value={form.bio}
          onChange={handleChange}
          placeholder="A short bio about you"
          helperText={`${form.bio.length} / ${MAX_BIO_LENGTH}`}
        />
      </div>

      {/* Actions */}
      <div className="mt-10 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={handleCancel}
          className="btn btn-outline"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={editProfileLoading}
          className="btn btn-primary"
        >
          {editProfileLoading ? <ButtonLoader /> : "Save changes"}
        </button>
      </div>
    </div>
  );
};

const Field = ({
  label,
  helperText,
  as = "input",
  className = "input",
  ...props
}) => {
  const Component = as;

  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </label>

      <Component
        {...props}
        className={`
          mt-2 w-full rounded-2xl border border-slate-200 bg-white
          px-5 py-3 text-base text-slate-900 outline-none transition
          focus:border-slate-400
          ${as === "textarea" ? "resize-none" : ""}
          ${className}
        `}
      />

      {helperText && (
        <div className="mt-2 text-xs text-slate-400">{helperText}</div>
      )}
    </div>
  );
};

export default EditProfile;
