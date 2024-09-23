import { FC } from "react";
import { cn } from "@/lib/utils";

type TextfieldProps = {
  title?: string;
  size: "xSmall" | "small" | "medium" | "large";
  name: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
};

const Textfield: FC<TextfieldProps> = ({
  title,
  size,
  name,
  value,
  placeholder,
  onChange,
  className,
}) => {
  const sizeClasses = {
    xSmall: "w-20",
    small: "w-40",
    medium: "w-80",
    large: "w-full",
  };

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label>{title}</label>
      <input
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={`bg-slate-100 rounded ${sizeClasses[size]} px-4 py-3 bg-slate-100 p-2 rounded border border-gray-300`}
      ></input>
    </div>
  );
};

export default Textfield;
