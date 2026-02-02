import React from "react";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import defaultUser from "../images/defaultUser.webp";

const UploadProfilePicture = ({ handleAvatarChange }) => {
  const [selectedFile, setSelectedFile] = useState(null); // the actual File
  const [previewUrl, setPreviewUrl] = useState(""); // blob URL for preview
  const fileInputRef = useRef(null);

  const { user } = useSelector((store) => store.auth);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic validation (optional but recommended)
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Max size is 5MB.");
      return;
    }

    setSelectedFile(file);

    // Create a local preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // ✅ CALL PARENT FUNCTION HERE
    handleAvatarChange?.({ file, previewUrl: url });

    // optional: lets you pick the same file twice and still trigger onChange
    e.target.value = null;
  };

  const clear = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl); // cleanup
    setSelectedFile(null);
    setPreviewUrl("");

    // ✅ also tell parent you removed it (optional but recommended)
    handleAvatarChange?.({ file: null, previewUrl: "" });
  };

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="mt-4 flex flex-col items-center">
          <div className="relative h-[200px] w-[200px] rounded-full border-[2px] border-gray-200 overflow-hidden">
            <img
              src={previewUrl || user.avatarUrl || defaultUser}
              alt="profile"
              className="h-full w-full object-cover rounded-full"
            />
          </div>

          {previewUrl && (
            <button
              type="button"
              onClick={clear}
              className="
                mt-3
                text-sm
                font-medium
                text-red-500
                hover:text-red-600
                transition
              "
            >
              Remove
            </button>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="
            mt-5
            btn btn-outline
          "
        >
          Change photo
        </button>
      </div>
    </div>
  );
};

export default UploadProfilePicture;
