import { cn } from "@/lib/utils";
import { FC, HTMLAttributes } from "react";
import Typography from "../Typography";

export type Status = "pending" | "complete" | null;

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

type ProgressStepsCardProps = HTMLAttributes<HTMLDivElement> & {
  status: Status;
  active: boolean;
  number: number;
  name: string;
  onClick: () => void;
};

export const ProgressStepsCard: FC<ProgressStepsCardProps> = ({
  status,
  active,
  number,
  name,
  onClick,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex flex-grow py-4 px-6 bg-zinc-200 text-black gap-6 cursor-pointer w-full items-center",
        { "bg-missing": status === "pending" },
        { "bg-complete": status === "complete" },
        { "bg-current": active }
      )}
      onClick={onClick}
      {...props}
    >
      <div
        className={cn(
          "flex justify-center items-center w-7 h-7 text-xl font-medium border-2 border-blue-500 text-blue-500 rounded-full shrink-0",
          { "border-black text-black": active },
          { "border-abbey text-abbey": status && !active }
        )}
      >
        {number}
      </div>
      <Typography
        className="text-nowrap overflow-hidden text-ellipsis"
        size="md"
      >
        {name}
      </Typography>
    </div>
  );
};
