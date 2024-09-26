import { FC } from "react";
import Close from "./icons/Close";
import Typography from "./Typography";
import { z } from "zod";

type FilePreviewProps = {
  file: File | string;
  removeFile: (name: string) => void;
};

const urlSchema = z.string().url();

const FilePreview: FC<FilePreviewProps> = ({ file, removeFile }) => {
  const isImage =
    file instanceof File
      ? file.type.startsWith("image/")
      : urlSchema.safeParse(file).success;

  const src = file instanceof File ? URL.createObjectURL(file) : file;
  const name =
    file instanceof File
      ? file.name
      : file.split("/")[file.split("/").length - 1];

  const formatName = (name: string) => {
    const values = name.split(".");
    return values[values.length - 1];
  };

  return (
    <div className="aspect-square bg-white relative" title={name}>
      <Close
        onClick={() => removeFile(name)}
        className="cursor-pointer absolute right-0 text-white z-10 w-8 h-8"
      />
      <div className="bg-black/20 aspect-square absolute inset-0" />
      {isImage ? (
        <img src={src} alt={name} className="aspect-square object-cover" />
      ) : (
        <div className="flex items-center justify-center text-zinc-600 aspect-square">
          <Typography className="font-medium" size="lg">
            {formatName(name).toUpperCase()}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default FilePreview;
