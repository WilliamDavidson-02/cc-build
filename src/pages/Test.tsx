import FileUpload from "@/components/Upload";
import { FC, useState } from "react";

type TestProps = {};

const Test: FC<TestProps> = ({}) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const uploadedUrls = [
    "http://127.0.0.1:54321/storage/v1/object/public/files/Wooded%20Area%20with%20Man%20and%20Dog.jpg",
    "http://127.0.0.1:54321/storage/v1/object/public/files/Screenshot%202024-09-16%20at%2014.32.06.png",
  ];

  return (
    <FileUpload
      title="ksopekfop"
      uploadedFiles={uploadedFiles}
      setUploadedFiles={(files) => setUploadedFiles(files)}
      className="max-w-[400px] mx-auto"
      urls={uploadedUrls}
    />
  );
};

export default Test;
