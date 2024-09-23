import { FC } from "react";
import Close from "./icons/Close";
import Typography from "./Typography";

type FilePreviewProps = {
  file: File;
  removeFile: (file: File) => void;
};

const FilePreview: FC<FilePreviewProps> = ({ file, removeFile }) => {
  const isImage = file.type.startsWith("image/");

  const formatName = (name: string) => {
    const values = name.split(".");
    return values[values.length - 1];
  };

  return (
    <div className="aspect-square bg-white relative" title={file.name}>
      <Close
        onClick={() => removeFile(file)}
        className="cursor-pointer absolute right-0 text-white z-10 w-8 h-8"
      />
      <div className="bg-black/20 aspect-square absolute inset-0" />
      {isImage ? (
        <img
          src={URL.createObjectURL(file)}
          alt={file.name}
          className="aspect-square object-cover"
        />
      ) : (
        <div className="flex items-center justify-center text-zinc-600 aspect-square">
          <Typography className="font-medium" size="lg">
            {formatName(file.name).toUpperCase()}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default FilePreview;
