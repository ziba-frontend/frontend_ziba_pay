import React, { useCallback, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { useDropzone, DropzoneOptions } from "react-dropzone";
import RiseLoader from "react-spinners/RiseLoader";

interface UploaderProps {
   onFileSelect: (file: File | null) => void;
}

const Uploader: React.FC<UploaderProps> = ({ onFileSelect }) => {
   const [loading, setLoading] = useState<boolean>(false);
   const [imageUrl, setImageUrl] = useState<string | null>(null);

   const onDrop = useCallback(async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      try {
         setLoading(true);
         // Simulate file upload and get image URL (replace with actual upload logic)
         const uploadedImageUrl = URL.createObjectURL(file);
         setImageUrl(uploadedImageUrl);
         onFileSelect(file);  // Pass the file to the parent component
      } catch (error) {
         console.error("File upload failed:", error);
         onFileSelect(null);  // Clear the file in case of an error
      } finally {
         setLoading(false);
      }
   }, [onFileSelect]);

   const { getRootProps, getInputProps, isDragActive, isDragReject } =
      useDropzone({
         multiple: false,
         onDrop,
         accept: {
            "image/*": [],
         },
      } as DropzoneOptions);

   return (
      <div className="w-full text-center gap-6">
         {loading ? (
            <div className="px-6 w-full py-6 border-2 border-border border-dashed bg-dry rounded-md">
               <RiseLoader color="#3BD64A" />
            </div>
         ) : (
            <div
               {...getRootProps()}
               className="px-6 w-full pt-5 pb-4 border-2 border-border border-dashed rounded-md cursor-pointer flex flex-col items-center"
            >
               <input {...getInputProps()} />
               <span className="text-3xl">
                  <FiUploadCloud />
               </span>
               <p className="text-sm mt-2">
                  Drag your file here or click to add your file
               </p>
               <em className="text-xs">
                  {isDragActive
                     ? "Drop it like it's hot!"
                     : isDragReject
                     ? "Unsupported format"
                     : " (only image files will be accepted)"}
               </em>
            </div>
         )}
         {imageUrl && (
            <div className="mt-4">
               <img
                  src={imageUrl}
                  alt="Uploaded Preview"
                  className="max-w-full h-auto rounded-md"
               />
            </div>
         )}
      </div>
   );
};

export default Uploader;
