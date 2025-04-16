// components/ui/ImageUpload.jsx
import { useState } from "react";

const ImageUpload = ({ onImageChange }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      onImageChange(file);
    }
  };

  return (
    <div className="mb-6">
      <label className="text-sm text-gray-700 mb-2">Upload Image</label>
      <input
        type="file"
        onChange={handleImageChange}
        className="w-full border text-base text-black px-4 py-3 rounded-lg"
      />
      {image && <img src={image} alt="Preview" className="mt-4 max-w-full h-auto" />}
    </div>
  );
};

export default ImageUpload;
