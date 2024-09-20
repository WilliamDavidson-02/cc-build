import { FC } from "react";

type TextfieldProps = {
  title: string;
  size: "xSmall" | "small" | "medium" | "large";
  name: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Textfield: FC<TextfieldProps> = ({
  title,
  size,
  name,
  value,
  onChange,
}) => {
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
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className={`bg-slate-100 rounded ${sizeClasses[size]} px-4 py-3 bg-slate-100 p-2 rounded border border-gray-300`}
      ></input>
    </div>
  );
};

export default Textfield;
