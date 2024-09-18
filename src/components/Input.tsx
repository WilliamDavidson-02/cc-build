import { cn } from "@/lib/utils";
import { FC, InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {};

const Input: FC<InputProps> = ({ type = "text", className, ...props }) => {
  const styles = {
    checkbox:
      "form-checkbox focus:outline-none focus-visible:outline-none focus:ring-0 rounded-[0.16rem] border border-zinc-500 text-blue-500 cursor-pointer",
    radio:
      "form-radio focus:outline-none focus-visible:outline-none focus:ring-0 w-5 h-5 text-blue-500 cursor-pointer",
  };

  const inputStyle = styles[type as keyof typeof styles] || "text";

  return (
    <input type={type} {...props} className={cn(inputStyle, className, "")} />
  );
};

export default Input;
