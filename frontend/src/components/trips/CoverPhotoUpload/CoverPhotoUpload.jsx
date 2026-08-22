import React, { useEffect, useState } from 'react';
import { Upload, X } from 'lucide-react';

const CoverPhotoUpload = ({ onFileSelect, error }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileError, setFileError] = useState('');

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setFileError('');

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFileError('Please select a valid image file (JPEG, PNG, WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFileError('File size must be 5MB or less.');
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const newPreviewUrl = URL.createObjectURL(file);
    setPreviewUrl(newPreviewUrl);
    setFileName(file.name);
    if (onFileSelect) {
      onFileSelect(file, newPreviewUrl);
    }
  };

  const handleRemove = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setFileName('');
    setFileError('');
    if (onFileSelect) {
      onFileSelect(null, null);
    }
  };

  const displayError = error || fileError;

  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
        Cover Photo <span className="text-xs font-normal text-slate-400">(Optional)</span>
      </label>

      {previewUrl ? (
        <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
          <img
            src={previewUrl}
            alt="Cover preview"
            className="h-44 w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent flex items-end justify-between p-3">
            <span className="truncate text-xs font-medium text-white max-w-[70%]">
              {fileName}
            </span>
            <button
              type="button"
              onClick={handleRemove}
              className="inline-flex items-center gap-1 rounded-lg bg-slate-900/80 px-2.5 py-1 text-xs font-medium text-white shadow-xs backdrop-blur-xs transition-all hover:bg-red-600 active:scale-95 cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
              Remove
            </button>
          </div>
        </div>
      ) : (
        <label className="group flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/60 p-6 text-center transition-all hover:border-teal-500 hover:bg-teal-50/30 cursor-pointer">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600 ring-1 ring-teal-100 group-hover:scale-105 transition-transform">
            <Upload className="h-5 w-5" />
          </div>
          <span className="text-sm font-semibold text-slate-700 group-hover:text-teal-700">
            Click to upload cover photo
          </span>
          <span className="mt-0.5 text-xs text-slate-400">
            PNG, JPG, WebP up to 5MB
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="sr-only"
          />
        </label>
      )}

      {displayError && (
        <p className="mt-1.5 text-xs font-medium text-red-600 animate-fadeIn">
          {displayError}
        </p>
      )}
    </div>
  );
};

export default CoverPhotoUpload;
