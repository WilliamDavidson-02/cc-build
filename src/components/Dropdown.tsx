import { FC } from "react";

type DropdownOption = {
  label: string;
  value: number;
};

type DropdownProps = {
  title: string;
  size?: "xSmall" | "small" | "medium" | "large";
  name: string;
  options: DropdownOption[] | string[];
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Dropdown: FC<DropdownProps> = ({
  title,
  options,
  size = "medium",
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
      <label htmlFor={name}>{title}</label>
      <select
        name={name}
        id={name}
        className={`${sizeClasses[size]} bg-slate-100 p-2 rounded border border-gray-300 px-6 py-3`}
        value={value}
        onChange={onChange}
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
