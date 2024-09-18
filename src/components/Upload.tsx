import React, { useState, useRef, DragEvent } from 'react';
import { cn } from '@/lib/utils';
import { z } from 'zod';
import upload from "/upload.svg";
import Typography from './Typography';

const uploadSchema = z.object({
  title: z.string(),
  onFilesSelected: z.function().args(z.array(z.instanceof(File))).optional(),
});

type FileUploadProps = z.infer<typeof uploadSchema>;


const FileUpload: React.FC<FileUploadProps> = ({ title, onFilesSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (files: File[]) => {
    if (onFilesSelected) {
      onFilesSelected(files);
    }
    
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <label >
        <Typography variant="h5" className="mb-0 font-semibold text-[14px] ">
        {title}
        </Typography>
      </label>
      <div
        className={`flex flex-row justify-center items-center bg-[#F9F9F9] border-2 border-[##E2E2E2] rounded-md p-4 text-center cursor-pointer ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          multiple
          accept="image/*,.svg"
          onChange={handleFileInput}
        />       
        <img src={upload} alt="upload" className="h-8 w-8 text-black" />
        <p className="mt-1 text-sm text-black">
          Dra och släpp fil här, eller välj
        </p>
      </div>
    </div>
  );
};

export default FileUpload;