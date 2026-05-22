import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  CloudUpload,
  FileText,
  Image,
  X,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import api from "../../api/axios";

const UploadZone = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState("");
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      toast.error("Only PDF, JPG, PNG files are accepted (max 10MB each)");
    }
    setFiles((prev) => {
      const combined = [...prev, ...acceptedFiles];
      if (combined.length > 5) {
        toast.error("Maximum 5 files allowed");
        return combined.slice(0, 5);
      }
      return combined;
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: true,
  });

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleGenerate = async () => {
    if (files.length === 0) return toast.error("Please upload at least one document");

    setUploading(true);
    setProgress("Uploading your documents...");

    const formData = new FormData();
    files.forEach((file) => formData.append("documents", file));

    try {
      setProgress("AI is reading your booking details... 🤖");
      const res = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProgress("Generating your itinerary... ✨");
      toast.success("Itinerary generated successfully!");
      navigate(`/itinerary/${res.data.itinerary._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to generate itinerary");
      setProgress("");
    } finally {
      setUploading(false);
    }
  };

  const getFileIcon = (file) => {
    if (file.type === "application/pdf") return <FileText className="w-5 h-5 text-red-500" />;
    return <Image className="w-5 h-5 text-blue-500" />;
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">New Trip</h1>
        <p className="text-gray-500 mt-1">
          Upload your flight tickets, hotel bookings, or any travel documents
        </p>
      </div>

      {/* Drop zone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200 ${
          isDragActive
            ? "border-blue-500 bg-blue-50 scale-[1.01]"
            : "border-gray-200 bg-white hover:border-blue-400 hover:bg-blue-50"
        }`}
      >
        <input {...getInputProps()} />
        <CloudUpload
          className={`w-12 h-12 mx-auto mb-4 transition-colors ${
            isDragActive ? "text-blue-500" : "text-gray-400"
          }`}
        />
        {isDragActive ? (
          <p className="text-blue-600 font-semibold text-lg">Drop files here!</p>
        ) : (
          <>
            <p className="text-gray-700 font-semibold text-lg">
              Drag & drop files here
            </p>
            <p className="text-gray-400 text-sm mt-1">or click to browse</p>
            <p className="text-gray-400 text-xs mt-3">
              Supports PDF, JPG, PNG • Max 10MB each • Up to 5 files
            </p>
          </>
        )}
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="mt-6 space-y-3">
          <h3 className="text-sm font-semibold text-gray-700">
            {files.length} file{files.length > 1 ? "s" : ""} selected
          </h3>
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3"
            >
              {getFileIcon(file)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                <p className="text-xs text-gray-400">{formatSize(file.size)}</p>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Info box */}
      <div className="mt-6 flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
        <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-amber-700">
          <p className="font-medium">Accepted documents</p>
          <p className="mt-0.5 text-amber-600">
            Flight e-tickets, hotel confirmations, train tickets, bus passes, or any travel booking document
          </p>
        </div>
      </div>

      {/* Loading state */}
      {uploading && (
        <div className="mt-6 card text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="text-blue-600 font-medium">{progress}</span>
          </div>
          <p className="text-xs text-gray-400">This may take 10–20 seconds</p>
        </div>
      )}

      {/* Generate button */}
      {!uploading && (
        <button
          onClick={handleGenerate}
          disabled={files.length === 0}
          className="btn-primary w-full mt-6 flex items-center justify-center gap-2 py-3"
        >
          <Sparkles className="w-5 h-5" />
          Generate AI Itinerary
        </button>
      )}
    </div>
  );
};

export default UploadZone;
