import { cn } from "@/lib/utils";
import { FC, HTMLAttributes } from "react";

export type Status = "pending" | "error" | "complete" | null;

type ProgressStepsProps = {
  className?: string;
  children?: React.ReactNode;
};

export const ProgressSteps: FC<ProgressStepsProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("grid grid-cols-5 w-full", className)}>{children}</div>
  );
};

type ProgressStepsCardProps = HTMLAttributes<HTMLElement> & {
  status: Status;
  active: boolean;
  children?: React.ReactNode;
};

export const ProgressStepsCard: FC<ProgressStepsCardProps> = ({
  children,
  className,
  status,
  active,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex flex-grow py-4 px-6 bg-zinc-300 text-black gap-6 cursor-pointer w-full",
        { "bg-yellow-400": status === "pending" },
        { "bg-red-400": status === "error" },
        { "bg-green-500": status === "complete" },
        { "bg-blue-400": active },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

type ProgressStepsCardNumberProps = {
  number: number;
  className?: string;
};

export const ProgressStepsCardNumber: FC<ProgressStepsCardNumberProps> = ({
  className,
  number,
}) => {
  return (
    <div
      className={cn(
        "flex justify-center items-center w-7 h-7 text-xl font-medium border-2 border-blue-500 text-blue-500 rounded-full shrink-0",
        className
      )}
    >
      {number}
    </div>
  );
};
