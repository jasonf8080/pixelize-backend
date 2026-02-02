import React, { useRef, useState } from 'react'
import { TbPhoto } from "react-icons/tb";

const UploadPost = ({handlePostChange}) => {
    const [selectedFile, setSelectedFile] = useState(null); // the actual File
    const [previewUrl, setPreviewUrl] = useState(""); // blob URL for preview
    const fileInputRef = useRef(null);


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
       handlePostChange?.({ file, previewUrl: url });

        // optional: lets you pick the same file twice and still trigger onChange
        e.target.value = null;
    };

  return (
    <div className="flex flex-col justify-center items-center h-full">
        <TbPhoto className="text-3xl mb-4" />
        <p>No media selected yet</p>

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
          Select photo
        </button>
    </div> 
  )
}

export default UploadPost
