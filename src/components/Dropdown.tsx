import { FC } from "react";
import { cn } from "@/lib/utils";

type DropdownOption = {
  label: string;
  value: string | number;
};

type DropdownProps = {
  title: string;
  size?: "xSmall" | "small" | "medium" | "large";
  name: string;
  options: DropdownOption[] | string[];
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  className?: string;
};

const Dropdown: FC<DropdownProps> = ({
  title,
  options,
  size = "medium",
  name,
  value,
  className,
  onChange,
  disabled = false,
}) => {
  const sizeClasses = {
    xSmall: "w-20",
    small: "w-40",
    medium: "w-80",
    large: "w-full",
  };

  const opacityClass = disabled ? "opacity-20" : "opacity-100";

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label className="font-semibold" htmlFor={name}>{title}</label>
      <select
        name={name}
        id={name}
        className={`${sizeClasses[size]} ${opacityClass}  bg-slate-100 p-2 rounded border border-gray-300 px-4 py-2`}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        <option value="" disabled>
          Välj
        </option>
        {options.map((option, index) =>
          typeof option === "string" ? (
            <option key={index} value={option}>
              {option}
            </option>
          ) : (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          )
        )}
      </select>
    </div>
  );
};

export default Dropdown;
