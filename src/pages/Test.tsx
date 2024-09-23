import FileUpload from "@/components/Upload";
import { FC, useState } from "react";

type TestProps = {};

const Test: FC<TestProps> = ({}) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  return (
    <FileUpload
      title="ksopekfop"
      uploadedFiles={uploadedFiles}
      setUploadedFiles={(files) => setUploadedFiles(files)}
      className="max-w-[400px] mx-auto"
    />
  );
};

export default Test;
