import { FC } from "react";
import { Status } from "./products/ProgressSteps";
import { cn } from "@/lib/utils";

type StatusColorProps = {
  status: Status;
};

const StatusColor: FC<StatusColorProps> = ({ status }) => {
  return (
    <div
      className={cn(
        "w-3 h-3 border border-black rounded-[3px]",
        { "bg-complete": status === "complete" },
        { "bg-missing": status === "pending" },
        { "bg-mercury": status === null }
      )}
    />
  );
};

export default StatusColor;
