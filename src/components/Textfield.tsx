import { FC } from "react";

type TextfieldProps = { title: string; size: "small" | "medium" | "large" };

const Textfield: FC<TextfieldProps> = ({ title, size }) => {
  const sizeClasses = {
    small: "w-40",
    medium: "w-80",
    large: "w-full",
  };

  return (
    <div className="flex flex-col">
      <label>{title}</label>
      <input
        name="title"
        type="text"
        className={`bg-slate-100 p-2 rounded ${sizeClasses[size]}`}
      ></input>
    </div>
  );
};

export default Textfield;
