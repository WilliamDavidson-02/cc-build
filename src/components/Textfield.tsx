import { FC } from "react";

type TextfieldProps = {
  title: string;
  size: "xSmall" | "small" | "medium" | "large";
};

const Textfield: FC<TextfieldProps> = ({ title, size }) => {
  const sizeClasses = {
    xSmall: "w-20",
    small: "w-40",
    medium: "w-80",
    large: "w-full",
  };

  return (
    <div className="flex flex-col gap-1">
      <label>{title}</label>
      <input
        name="title"
        type="text"
        className={`bg-slate-100 p-2 rounded ${sizeClasses[size]} px-4 py-3 bg-slate-100 p-2 rounded border border-gray-300`}
      ></input>
    </div>
  );
};

export default Textfield;
