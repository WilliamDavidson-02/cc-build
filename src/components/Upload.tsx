import React, { useState, DragEvent } from "react";
import { cn } from "@/lib/utils";
import upload from "/upload.svg";
import Typography from "./Typography";
import FilePreview from "./FilePreview";
import { v4 as uuid } from "uuid";

const fileTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/svg+xml",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "text/plain",
  "text/csv",
  "application/zip",
  "application/x-rar-compressed",
  "application/json",
  "application/xml",
  "application/rtf",
  "application/octet-stream",
] as const;

type AcceptedFileTypes = (typeof fileTypes)[number];

type FileUploadProps = {
  title: string;
  uploadedFiles: File[];
  urls?: string[];
  setUploadedFiles: (files: File[]) => void;
  className?: string;
  acceptedFileTypes?: AcceptedFileTypes[];
};

const FileUpload: React.FC<FileUploadProps> = ({
  title,
  className,
  uploadedFiles,
  setUploadedFiles,
  acceptedFileTypes = fileTypes,
  urls,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const acceptAttribute = acceptedFileTypes.join(",");

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    // Check if the related target is a child of the drop area
    const relatedTarget = e.relatedTarget as HTMLElement;
    const dropArea = e.currentTarget;

    // If the related target is outside the drop area, set isDragging to false
    if (!dropArea.contains(relatedTarget)) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const { files } = e.dataTransfer;

    if (files && files.length) handleFiles(Array.from(files));
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files.length) handleFiles(Array.from(files));
  };

  const handleFiles = (files: File[]) => {
    const acceptedFiles = files
      .filter((file) =>
        acceptedFileTypes.includes(file.type as AcceptedFileTypes)
      )
      .map((file) => {
        return new File([file], uuid() + "_" + file.name, { type: file.type });
      });

    const allFiles = [...uploadedFiles, ...acceptedFiles];
    setUploadedFiles(allFiles);
  };

  const handleRemoveFile = (name: string) => {
    setUploadedFiles(uploadedFiles.filter((f) => f.name !== name));
  };

  return (
    <div className={cn("w-full flex flex-col gap-3 ", className)}>
      <label className="flex flex-col gap-2">
        <Typography size="sm" className="font-semibold">
          {title}
        </Typography>
        <div
          className={cn(
            "flex items-center px-4 gap-2 h-[5.5rem] bg-albaster rounded-[0.2rem] border border-mercury",
            {
              "border-blue-500": isDragging,
            }
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input
            type="file"
            className="hidden"
            multiple
            accept={acceptAttribute}
            onChange={handleFileInput}
          />
          <img src={upload} alt="upload" className="h-6 w-6 text-black" />
          <Typography
            className="text-abbey text-center w-full font-medium"
            size="sm"
          >
            Dra och släpp bilder här eller bläddra
          </Typography>
        </div>
      </label>
      <div className="grid grid-cols-4 gap-3">
        {uploadedFiles.map((file) => (
          <FilePreview
            key={file.name}
            file={file}
            removeFile={handleRemoveFile}
          />
        ))}
        {urls?.map((url) => (
          <FilePreview
            key={url}
            file={url}
            removeFile={(file) => console.log(file)}
          />
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
