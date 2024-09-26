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
  type?: React.HTMLInputTypeAttribute;
  disabled?: boolean;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

const Textfield: FC<TextfieldProps> = ({
  title,
  size,
  name,
  value,
  placeholder,
  onChange,
  className,
  type = "text",
  disabled = false,
  onFocus,
  onBlur,
}) => {
  const sizeClasses = {
    xSmall: "w-20",
    small: "w-40",
    medium: "w-80",
    large: "w-full",
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label className="font-semibold">{title}</label>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        className={`bg-[#F9F9F9] rounded ${sizeClasses[size]} px-4 py-2 rounded border border-[#E2E2E2] text-[#495057]`}
      ></input>
    </div>
  );
};

export default Textfield;
